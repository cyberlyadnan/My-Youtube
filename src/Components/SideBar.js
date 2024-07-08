import React, { useEffect, useState } from 'react';
import MenuList from './MenuList';
import SideBarIcons from './SideBarIcons';
import { useDispatch, useSelector } from 'react-redux';
import { collapseMenu, isphone } from '../Utils/appSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const condition = useSelector((store) => store.app.isMenuOpen);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setDeviceType('mobile');
        dispatch(isphone())
      } else {
        setDeviceType('desktop');
      }
    };

    checkDeviceType(); // Initial check
    window.addEventListener('resize', checkDeviceType); // Check on resize

    return () => {
      window.removeEventListener('resize', checkDeviceType); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (deviceType === "mobile") {
      dispatch(collapseMenu());
    }
  }, [deviceType, dispatch]);

  return (
    <div>
      {condition ? <MenuList className="w-2/12" /> : <SideBarIcons />}
    </div>
  );
};

export default SideBar;
