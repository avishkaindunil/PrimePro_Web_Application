import React from 'react'

export default function EmpCategory({item, isActive, onClick}) {
  return (
    <>

        <div className={`px-3 py-2 mx-6 mt-6  rounded-lg shadow-lg will-change-auto cursor-pointer ${isActive ? 'bg-[#549CFD]':'bg-white'}`} onClick={onClick}>

        <div className={`px-3 py-2 mx-6 mt-6  rounded-lg shadow-lg will-change-auto cursor-pointer ${isActive ? 'bg-[#549CFD] text-white':'bg-[#F7F7F7]'}`} onClick={onClick}>

            <h2>{item.name}</h2>
         </div>
    </>
  )
}

