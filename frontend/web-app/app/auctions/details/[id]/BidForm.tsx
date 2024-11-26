/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { placeBidForAuction } from "@/app/actions/auctionActions"
import { numberWithComma } from '@/app/lib/numberWithComma'
import { useBidStore } from "@/hooks/useBidStroe"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    auctionId: string
    highBid: number
}

export default function BidForm({ auctionId, highBid }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const addBid = useBidStore(state => state.addBid);

    function onSubmit(data: FieldValues) {
        if (data.amount <= highBid) {
            reset();
            return toast.error('Bid must be at least $' + numberWithComma(highBid + 1));
        }

        placeBidForAuction(auctionId, +data.amount).then(bid => {
            if (bid.error) throw bid.error;
            addBid(bid);
            reset();
        }).catch(err => {
            console.log(err);
            toast.error(err.message)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 rounded-lg py-2">
            <input
                type="number"
                {...register('amount')}
                className="flex grow
                    focus:outline-none
                    border-transparent
                    focus:border-transparent
                    focus:ring-0
                    input-custom
                    text-sm
                    text-gray-600"
                placeholder={`Enter your bid (minimum bid is $${numberWithComma(highBid + 1)})`}
            />
        </form>
    )
}