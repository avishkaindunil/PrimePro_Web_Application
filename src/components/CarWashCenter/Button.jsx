import React from 'react'

function Button(props) {
  return (
<button className='px-6 py-2 mt-10 font-normal text-white duration-500 bg-indigo-600 rounded-full hover:bg-indigo-800 w-[90%]'>
   {props.children}
</button>
  )
};

export default Button;