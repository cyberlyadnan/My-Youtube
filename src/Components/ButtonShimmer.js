import React from 'react';
import { Shimmer } from "react-shimmer";

const ButtonShimmer = () => {
  return (
    <div >
      <Shimmer width="80px" height="30px"  className='rounded-lg'>
        <h2></h2>
      </Shimmer>
    </div>
  );
};

export default ButtonShimmer;
