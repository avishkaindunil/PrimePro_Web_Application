import React from 'react'

const EmpAmount = ({empAmount, text}) => {
  return (
    <>
        <div className="space-y-3">
            <h1 className="flex justify-center text-xl ">{text}</h1>
            <div className="bg-[#2392D7] text-white flex justify-center mx-16 text-5xl py-7 rounded-3xl">{empAmount}</div>
        </div>
    </>
  )
}

export default EmpAmount
