import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

function InfoLine(props) {
    const { data } = props;
    return (
        <div className="w-full border border-gray-300 rounded py-3 px-6 box-border overflow-hidden">
            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-row justify-between items-center max-w-[60%] gap-5">
                    <FontAwesomeIcon icon={faBell} className="w-5 h-5 p-2 rounded text-green-400 ring-2 ring-green-400"/>
                    <div className="w-full flex flex-col items-between justify-center">
                        <p className="font-medium text-md text-gray-600 truncate">{data?.title}</p>
                        <p className="text-gray-400 text-sm truncate">{data?.uptime}</p>
                    </div>
                </div>
                <div className="grow"></div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="w-full flex flex-col items-between justify-center text-center">
                        <p className="font-medium text-lg text-gray-600 truncate">
                            { formatCurrency(data?.price) } vnđ
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                            {data?.productArea} m²
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-between justify-center text-center">
                        <p className="text-lg text-green-500 font-bold truncate">
                            + {data?.profit}%
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                            lợi nhuận
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoLine;