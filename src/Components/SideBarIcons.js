import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlayCircle, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

const SideBarIcons = () => {
  return (
    <div className=' bg-white shadow-lg h-full py-2 lg:p-2 lg:h-full'>
      <div className='mb-6'>
        <ul>
          <Link to="/"><li className='text-xl py-3 px-3 lg:mb-4  lg:text-2xl  lg:py-4  lg:px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faHome} className='text-gray-700 hover:text-black' /></li></Link>
          <li className='text-xl py-3 px-3 lg:mb-4  lg:text-2xl  lg:py-4  lg:px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faPlayCircle} className='text-gray-700 hover:text-black' /></li>
          <li className='text-xl py-3 px-3 lg:mb-4  lg:text-2xl  lg:py-4  lg:px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faUsers} className='text-gray-700 hover:text-black' /></li>
          <li className='text-xl py-3 px-3 lg:mb-4  lg:text-2xl  lg:py-4  lg:px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faUser} className='text-gray-700 hover:text-black' /></li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarIcons;
