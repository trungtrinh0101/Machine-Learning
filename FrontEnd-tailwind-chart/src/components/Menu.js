import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faChalkboard, faChartLine, faClockRotateLeft, faGear, faMagnifyingGlass, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const routes = [
    // {
    //     id: 1,
    //     path: '/',
    //     routeName: 'Trang chủ',
    //     icon: faChalkboard
    // },
    {
        id: 2,
        path: '/',
        routeName: 'Cá nhân',
        icon: faChartLine
    },
    {
        id: 3,
        path: '/',
        routeName: 'Phát hiện',
        icon: faMagnifyingGlass
    },
    {
        id: 4,
        path: '/',
        routeName: 'Thanh toán',
        icon: faMoneyCheck
    },
    {
        id: 5,
        path: '/',
        routeName: 'Lịch sử',
        icon: faClockRotateLeft
    },
    {
        id: 6,
        path: '/',
        routeName: 'Liên hệ',
        icon: faAddressCard
    },
    {
        id: 7,
        path: '/',
        routeName: 'Cài đặt',
        icon: faGear
    }
]

function Menu(props) {
    return (
        <div className="w-1/6 min-w-1/6 min-h-full px-10 py-8 bg-[#F0F9F8]">
            <div className="font-medium text-gray-900 text-3xl">
                BĐS-ĐN
            </div>
            <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 shadow-green-200 text-white rounded mt-2 transition-all">
                Đăng nhập
            </button>
            <p className="uppercase mt-5 text-gray-400 text-2sm group">Menu</p>
            <a href='/' className="group">
                <div className="flex flex-row py-1">
                    <div className="h-10 w-2 rounded transform -translate-x-11 bg-green-300"></div>
                    <div className="flex flex-row items-center gap-3">
                        <FontAwesomeIcon icon={faChalkboard} className="-translate-y-0.5 text-green-500"/>
                        <p className="text-green-500 font-semibold transition">Trang chủ</p>
                    </div>
                </div>
            </a>
            {
                routes.map((route) => (
                    <a href={route.path} className="group" key={route.id}>
                        <div className="flex flex-row py-1">
                            <div className="h-10 w-2 rounded transform -translate-x-11 group-hover:bg-green-300"></div>
                            <div className="flex flex-row items-center gap-3">
                                <FontAwesomeIcon icon={route.icon} className="-translate-y-0.5 text-gray-400 group-hover:text-green-500"/>
                                <p className="text-gray-400 group-hover:text-green-500 group-hover:font-semibold transition">
                                    {route.routeName}
                                </p>
                            </div>
                        </div>
                    </a>
                ))
            }
            
        </div>
    );
}

export default Menu;