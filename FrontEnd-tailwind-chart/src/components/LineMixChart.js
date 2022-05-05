import React from 'react';
import ReactApexChart from 'react-apexcharts';

function LineMixChart(props) {
    const { chartValues } = props;
    // const [chartValues, setChartValues] = useState({
    //     series: [{
    //         name: 'Diện tích',
    //         type: 'column',
    //         data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    //     }, {
    //         name: 'Giá',
    //         type: 'line',
    //         data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    //     }],
    //     options: {
    //         chart: {
    //             height: 350,
    //             type: 'line',
    //         },
    //         stroke: {
    //             width: [0, 4]
    //         },
    //         dataLabels: {
    //             enabled: true,
    //             enabledOnSeries: [1]
    //         },
    //         labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', 
    //         '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    //         xaxis: {
    //             type: 'datetime'
    //         },
    //         yaxis: [{
    //             title: {
    //             text: 'Diện tích',
    //             },
            
    //         }, {
    //             opposite: true,
    //             title: {
    //             text: 'Giá'
    //             }
    //         }]
    //     },
    //   });

    return (
        <ReactApexChart options={chartValues.options} series={chartValues.series} type="line" height={350} className="w-full"/>
    );
}

export default LineMixChart;