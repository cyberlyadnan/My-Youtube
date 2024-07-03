import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlayCircle, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

const SideBarIcons = () => {
  return (
    <div className=' bg-white shadow-lg p-2 h-[800PX]'>
      <div className='mb-6'>
        <ul>
          <Link to="/"><li className='mb-4 text-2xl py-4 px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faHome} className='text-gray-700 hover:text-black' /></li></Link>
          <li className='mb-4 text-2xl py-4 px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faPlayCircle} className='text-gray-700 hover:text-black' /></li>
          <li className='mb-4 text-2xl py-4 px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faUsers} className='text-gray-700 hover:text-black' /></li>
          <li className='mb-4 text-2xl py-4 px-4 hover:rounded-lg rounded-lg cursor-pointer hover:bg-gray-100'><FontAwesomeIcon icon={faUser} className='text-gray-700 hover:text-black' /></li>
        </ul>
      </div>
    </div>
  );
}

export default SideBarIcons;
