import React from 'react'
import Button from "./Button"

const data = ["All", "Gaming", "Software Engineering", "JavaScript","HTML","Islamic","Digital Marketing","React","Arabic","Urdu","Research","Data"]
const ButtonList = () => {
  return (
    <div className='flex px-2 py-3'>
      {data.map((tag, index)=> <Button key={index} name={tag} /> )}
    </div>
  )
}

export default ButtonList
