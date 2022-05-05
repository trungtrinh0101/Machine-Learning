import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

// const seedData = [
//     {
//         id: 1,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 320000000,
//         acreage: 32
//     },
//     {
//         id: 2,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 320000000,
//         acreage: 32
//     },
//     {
//         id: 3,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 1320000000,
//         acreage: 32
//     },
//     {
//         id: 4,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 890000000,
//         acreage: 32
//     },
//     {
//         id: 5,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 880000000,
//         acreage: 32
//     },
//     {
//         id: 6,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 325000000,
//         acreage: 32
//     },
//     {
//         id: 7,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 220000000,
//         acreage: 32
//     },
//     {
//         id: 8,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 120000000,
//         acreage: 32
//     },
//     {
//         id: 9,
//         address: '02 Cống Quỳnh, quận Cẩm Lệ, thành phố Đà Nẵng',
//         price: 120000000,
//         acreage: 32
//     }
// ];

function DataTable(props) {
    const { values } = props;
    return (
        <div className="w-full flex flex-col border border-gray-200 rounded-lg mt-3">
            <div className=" sm:-mx-6 lg:-mx-8">
                <div className="py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-hidden overflow-y-scroll max-h-[380px] 
                    scrollbar scrollbar-thumb-red-400 scrollbar-track-red-100">
                        <table className="min-w-full">
                            <thead className="sticky border-b top-0 bg-white">
                                <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-5 py-2 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-5 py-2 pl-1 text-left">
                                    Địa chỉ
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-5 py-2 text-left">
                                    Giá tiền (vnđ)
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-5 py-2 text-left">
                                    Diện tích
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    values.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="max-w-[160px] text-sm text-gray-900 font-light py-4 pl-1 pr-0">
                                                <p className="truncate text-ellipsis overflow-hidden">{row.title}</p>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-5 py-4 whitespace-nowrap">
                                                {formatCurrency(row.price)}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-5 py-4 whitespace-nowrap">
                                                {row.productArea} m²
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataTable;