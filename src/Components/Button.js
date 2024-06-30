import React from 'react'

const Button = ({name}) => {
  return (
    <div className='mx-2 my-2 cursor-pointer px-3 py-1 hover:bg-slate-300 bg-slate-200 rounded-lg text-black font-bold'>
      <h2>{name}</h2>
    </div>
  )
}

export default Button
