import React, { useState } from 'react'

const AddEmployee = () => {
    
    const [formData, setFormData] = useState({
        fname:'',
        lname:'',
        nic:'',
        email:'',
        phone:'',
        address:''
    })
    
    const handleCancel = (e)=>{
        setFormData({
            fname:'',
            lname:'',
            nic:'',
            email:'',
            phone:'',
            address:''
        });        
    };
    
  return (
    <div>
      <h1 className="text-xl font-bold">Add New Employee</h1>
      <div className='border border-black rounded-[15px] m-7 p-9 items-center content-center'>
      <form>
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label for='fname'>First Name</label><br/>
                <input className='w-[90%] h-10 rounded-lg px-5' id='fname' name='fname' type='text' placeholder='Enter first name'/>
            </div>
            
            <div className='flex-[50%]'>
                <label>Last Name</label><br/>
                <input className='w-[90%] h-10 rounded-lg px-5' id='lname' name='lname' type='text' placeholder='Enter last name'/>
            </div>
        </div>
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label>NIC:</label><br/>
                <input className='w-[90%] h-10 rounded-lg px-5' id='nic' name='nic' type='text' placeholder='Enter NIC'/>
            </div>
            <div className='flex-[50%]'>
                <label>Phone No:</label><br/>
                <input className='w-[90%] h-10 rounded-lg px-5' id='phone' name='phone' type='pnone' placeholder='Enter phone number'/>
            </div>
        </div>
        <div className='p-1 m-3'>
            <label>Email:</label><br/>
            <input className='w-[90%] h-10 rounded-lg px-5' id='email' name='email' type='text' placeholder='Enter email'></input>
        </div>
        <div className='p-1 m-3'>
            <label>Address:</label><br/>
            <input className='w-[90%] h-10 rounded-lg px-5' id='address' name='address' type='text' placeholder='Enter address'/>
        </div>
        <div className='flex flex-wrap content-center justify-center p-3 m-3 space-x-28'>
            <button className='px-5 py-2 text-white bg-blue-600 rounded-lg w-[100px]'>save</button>
            <button className='px-5 py-2 rounded-lg bg-slate-100 w-[100px]' onClick={handleCancel}>cancel</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddEmployee
