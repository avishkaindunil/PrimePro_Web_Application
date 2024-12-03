import React from 'react'

const EmpAmount = ({empAmount, text}) => {
  return (
    <>
        <div className="flex content-center justify-center p-5 space-x-4 font-semibold text-center rounded-lg bg-slate-200">
            <h1 className="text-xl ">{text}</h1>
            <div className="text-2xl font-bold">{empAmount}</div>
        </div>
    </>
  )
}

export default EmpAmount
