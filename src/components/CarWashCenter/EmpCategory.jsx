import React from 'react'

export default function EmpCategory({item, isActive, onClick}) {
  return (
    <>
        <div className={`px-3 py-2 mx-6 mt-6  rounded-lg shadow-lg will-change-auto cursor-pointer ${isActive ? 'bg-[#203aac] text-white':'bg-[#F7F7F7]'} w-[200px] text-center`} onClick={onClick}>
            <h3 className="text-xl">{item.name}</h3>
         </div>
    </>
  )
}

