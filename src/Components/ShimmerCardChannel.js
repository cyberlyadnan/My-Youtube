import React from "react";
import { Shimmer } from "react-shimmer";

const ShimmerCard = () => {
    return (
        <div className="m-2 p-2 px-60 w-full bg-slate-50 shadow-md rounded-lg hover:bg-slate-200 border-1">
            <div className="card-media flex justify-center">
                <Shimmer width={700} height={176} className="rounded-lg w-full" />
            </div>
            <div className="p-2">
                <Shimmer width={80} height={20} className="mb-2" />
                <Shimmer width={100} height={16} className="mb-1" />
                <Shimmer width={100} height={16} className="mb-2" />
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center p-1 rounded-md">
                        <Shimmer width={40} height={20} className="mr-1" />
                        <Shimmer width={60} height={16} />
                    </div>
                    <Shimmer width={70} height={16} />
                </div>
            </div>
        </div>
    );
};

export default ShimmerCard;
