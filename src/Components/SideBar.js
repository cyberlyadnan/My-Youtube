import React from 'react'
import MenuList from './MenuList'
import SideBarIcons from './SideBarIcons'
import { useSelector } from 'react-redux'

const SideBar = () => {
  const condition = useSelector((store)=>store.app.isMenuOpen)
  return (
    <div>
      {condition ? <MenuList className="w-2/12"/> :  <SideBarIcons/>}
      
     
    </div>
  )
}

export default SideBar
