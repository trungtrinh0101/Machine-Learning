import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
// import Pie2DChart from './Pie2DChart';
import InfoLine from './InfoLine';
import LineMixChart from './LineMixChart';
import { returnValues } from '../dataset';
import { cloneDeep } from 'lodash';
import { groupObjectByField } from '../utils/groupObjectByField';
import { formatCurrency } from '../utils/formatCurrency';

function Panel(props) {
    const [values, setValues] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('Liên Chiểu');
    const [initialData, setInitialData] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [chartValues, setChartValues] = useState({
        series: [{
            name: 'Diện tích',
            type: 'column',
            data: []
        }, {
            name: 'Giá',
            type: 'line',
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            stroke: {
                width: [0, 4]
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: [],
            xaxis: {
                type: 'datetime'
            },
            yaxis: [{
                title: {
                text: 'Diện tích',
                },
            
            }, {
                opposite: true,
                title: {
                text: 'Giá'
                }
            }]
        },
    });

    useEffect(() => {
        const initLoad = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/');
                setInitialData(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        initLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateData = (data) => {
        const rawValues = cloneDeep(initialData || data);
        console.log('rawValues =', rawValues);
        // Loại bỏ những trường có price = "Gía thỏa thuận"
        const filterPriceValues = rawValues.filter((row) => row.price !== "Giá thỏa thuận");

        // lọc record theo khu vực quận
        const cloneValues = filterPriceValues.filter((row) => row.distCity.includes(selectedDistrict));

        // đổi các giá trị productArea và price từ string sang number
        cloneValues.forEach(function(row) {
            const x = row.productArea.split(" ")[0];
            row.productArea = parseFloat(x);

            // kiếm soát các trường hợp ở đây
            // nếu chuỗi có "triệu/m2" tức là đó chưa phải giá cuối cùng, cần lấy số đó nhân với 1 triệu
            if (row.price.includes("triệu")) {
                const y = row.price.split(" ")[0] * 1000000;
                row.price = parseInt(parseFloat(y) * row.productArea);
            } else {
                // còn nếu có "tỷ" thì lấy giá trị nhân với 1000000000
                const z = row.price.split(" ")[0];
                row.price = parseInt(parseFloat(z) * 1000000000);
            }

            // Lấy ra quận chính xác
            row.distCity = row.distCity.split(",")[0];
        });

        // tính trung bình 'price' của tất cả record đã nhóm theo 'uptime',
        const priceArray = groupObjectByField(cloneValues, 'uptime', 'price');
        // tạo mảng chỉ chứa value của priceArray - sắp xếp theo chiều tăng dần
        const pricePerMonth = Object.entries(priceArray).sort().map(value => value[1]);
        // tạo mảng chỉ chứa key của priceArray - sắp xếp theo chiều tăng dần
        // đảm bảo pricePerMonth và pricePerMonthLabel phải khớp với nhau
        const pricePerMonthLabel = Object.entries(priceArray).sort().map(function(value) {
            const arr = value[0].split("/");
            arr[1] = "April";
            return arr.join(" ");
        });

        // tính trung bình 'productArea' của tất cả record đã nhóm theo 'uptime',
        const areaArray = groupObjectByField(cloneValues, 'uptime', 'productArea');
        // tạo mảng chỉ chứa value của areaArray - sắp xếp theo chiều tăng dần
        const areaPerMonth = Object.entries(areaArray).sort().map(value => value[1]);

        setChartValues({ 
            series: [{
                name: 'Diện tích (m²)',
                type: 'column',
                data: areaPerMonth
            }, {
                name: 'Giá (vnđ)',
                type: 'line',
                data: pricePerMonth
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: pricePerMonthLabel,
                xaxis: {
                    type: 'datetime',
                    labels: {
                        format: 'dd MM yyyy'
                    }
                },
                yaxis: [{
                    title: {
                        text: 'Diện tích',
                    }
                }, {
                    opposite: true,
                    title: {
                        text: 'Giá'
                    }
                }]
            }
        });

        setValues(cloneValues);

        
        // tính giá trung bình của giá, diện tích
        const avgPrice = pricePerMonth.reduce((total, next) => total + next, 0) / pricePerMonth.length;
        const avgArea = areaPerMonth.reduce((total, next) => total + next, 0) / areaPerMonth.length;
        // tính tỷ lệ giữa trung bình giá và diện tích
        const priceAndAreaRatio = avgPrice / avgArea;
        console.log('avgPrice =', formatCurrency(avgPrice));
        console.log('avgArea =', avgArea);
        console.log('priceAndAreaRatio =', priceAndAreaRatio);

        // lọc ra những record có tỷ lệ giá / diện tích nhỏ hơn priceAndAreaRatio
        const recommenData = cloneValues.filter((data) => {
            const x = (data.price / data.productArea) <= priceAndAreaRatio;
            console.log((data.price / data.productArea) + '<=' + priceAndAreaRatio + " = " + x);
            return x;
        });
        // console.log('filter 1 data =', recommenData);
        // tính toán tỷ lệ lợi nhuận
        recommenData.map((data) => data.profit = parseFloat(((1 - (data.price / data.productArea) / priceAndAreaRatio)) * 100).toFixed(3));
        setRecommend(recommenData);
    }

    // useEffect(() => {
    //     calculateData();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [values]);

    useEffect(() => {
        calculateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDistrict, initialData]);

    const handleSelectDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    return (
        <div className='w-5/6 h-[100vh] py-8 px-10 overflow-y-scroll scrollbar'>
            {/* HEADER */}  
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <p className="text-gray-600 text-2xl">Chào mừng bạn đến với&nbsp;
                        <span className="text-green-600 font-medium">BĐS-ĐN</span>
                    </p>    
                    <p className="text-md text-gray-400">Xin chào, Trung</p>    
                </div>
                <div className="flex flex-row gap-6 items-center">
                    <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-300"/>
                    <img className="inline-block h-8 w-8 rounded-full ring-4 ring-white shadow-lg shadow-green-500/50" 
                        src="https://yt3.ggpht.com/KH-iLhMgRo7yin-x7tjRNSvYrzNGFsEcT8r7am-v9R5avgddZBZsfz0bmy4OSGX-G7KdnvpjBA=s88-c-k-c0x00ffffff-no-rj" 
                        alt="user avatar"
                    />
                </div>
            </div> 
            {/* END HEADER */}
            {/* CHART */}
            <div className="mt-8 flex-1 flex flex-row justify-between items-start gap-3">
                <div className="w-3/5 flex flex-col items-start justify-center">
                    <p className="text-md font-bold text-gray-700">Thống kê theo tháng</p>
                    <div className="w-full my-3 flex flex-row justify-start items-center gap-5">
                        <p className="w-fit text-gray-400">Chọn khu vực</p>
                        <select className="form-select appearance-none
                            block
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                            aria-label="Default select example"
                            value={selectedDistrict}
                            onChange={handleSelectDistrictChange}
                        >
                            <option value="Hải Châu">Hải Châu</option>
                            <option value="Cẩm Lệ">Cẩm Lệ</option>
                            <option value="Thanh Khê">Thanh Khê</option>
                            <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
                            <option value="Liên Chiểu">Liên Chiểu</option>
                            <option value="Hòa Vang">Hòa Vang</option>
                            <option value="Sơn Trà">Sơn Trà</option>
                        </select>
                    </div>
                    <LineMixChart chartValues={chartValues}/>
                </div>
                <div className="w-2/5 h-full flex flex-col items-start">
                    <p className="font-medium text-md">Chi tiết tin bán</p>
                    <DataTable values={values}/>
                </div>
            </div>
            {/* END CHART */}
            {/* PORTFORLIO */}
            <div className="flex flex-row items-start justify-between mt-8 gap-10">
                <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-gray-700 text-md text-lg font-bold">Đề cử mua trong khu vực {selectedDistrict}</p>
                    <div className="w-full flex flex-col gap-3 mt-3">
                        {
                            recommend.length > 0
                                ? recommend.map((data, index) => <InfoLine key={index} data={data}/>)
                                : <p className="text-gray-400">Không có đề cử tại khu vực này</p>
                        }
                    </div>
                </div>
                {/* <div className="w-2/5 flex flex-col">
                    <p className="text-gray-700 text-md text-lg font-bold">Your portfolio</p>
                    <div className="w-[400px] h-[300px]">
                        <Pie2DChart/>
                    </div>
                </div> */}
            </div>
            {/* END PORTFOLIO */}
        </div>
    );
}

export default Panel;