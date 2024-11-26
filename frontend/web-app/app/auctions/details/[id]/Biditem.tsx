import { numberWithComma } from '@/app/lib/numberWithComma';
import { Bid } from '@/types';
import { format, isValid } from 'date-fns';
import React from 'react';

type Props = {
    bid: Bid;
}

export default function Biditem({ bid }: Props) {
    function getBidInfo() {
        let bgColor = '';
        let text = '';
        switch (bid.bidStatus) {
            case 'Accepted':
                bgColor = 'bg-green-200';
                text = 'Bid accepted';
                break;
            case 'AcceptedBelosReserve':
                bgColor = 'bg-amber-500';
                text = 'Reserve not met';
                break;
            case 'TooLow':
                bgColor = 'bg-red-200';
                text = 'Bid was too low';
                break;
            default:
                bgColor = 'bg-red-200';
                text = 'Bid placed after auction finished';
                break;
        }
        return { bgColor, text };
    }

    // Check if bidTime is valid
    const bidTime = new Date(bid.bidTime);
    const formattedBidTime = isValid(bidTime) ? format(bidTime, 'dd MMM yyyy h:mm a') : 'Invalid Date';

    return (
        <div className={`
            border-gray-300 border-2 px-3 py-2 rounded-lg
            flex justify-between items-center
            ${getBidInfo().bgColor}
        `}>
            <div className="flex flex-col">
                <span>Bidder: {bid.bidder}</span>
                <span className="text-gray-700 text-sm">Time: {formattedBidTime}</span>
            </div>
            <div className="flex flex-col text-right">
                <div className="text-xl font-semibold">${numberWithComma(bid.amount)}</div>
                <div className="flex flex-row items-center">
                    <span>{getBidInfo().text}</span>
                </div>
            </div>
        </div>
    );
}
