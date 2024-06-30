import React from "react";
import { Shimmer } from "react-shimmer";

const ShimmerCard = () => {
    return (
        <div className="m-2 p-2 w-72 bg-slate-50 shadow-md rounded-lg hover:bg-slate-200 border-1">
            <div className="card-media">
                <Shimmer width="100%" height="176px" className="rounded-lg" />
            </div>
            <div className="p-2">
                <Shimmer width="60%" height="20px" className="mb-2" />
                <Shimmer width="80%" height="16px" className="mb-1" />
                <Shimmer width="90%" height="16px" className="mb-2" />
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center p-1  rounded-md">
                        <Shimmer width="20px" height="20px" className="mr-1" />
                        <Shimmer width="40px" height="16px" />
                    </div>
                    <Shimmer width="50px" height="16px" />
                </div>
            </div>
        </div>
    );
};

export default ShimmerCard


