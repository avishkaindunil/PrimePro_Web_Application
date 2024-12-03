import React, { useEffect, useState } from 'react'
import { publicAuthRequest } from "../../constants/requestMethods";

const AddEmployee = () => {

    const [formData, setFormData] = useState({
        name:'',
        nic:'',
        email:'',
        phone:'',
        city:'',
        designation:'',
        date_of_birth:'',
        salary:'',
        annual_leaves:'',
        cashual_laves:'',
        medical_leaves:'',
        id_probation:true
    });

    //set the changes of data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    

//call api for add employee
    const handleOnClick =async(e)=>{
        console.log(formData);
        e.preventDefault();
        
        // const user= [
        //     email=formData.email,
        // ]

            try {
                const res =  await publicAuthRequest.post(`/employee/add`,formData);
                console.log(res.data);
                setFormData({
                    name:'',
                    nic:'',
                    email:'',
                    phone:'',
                    city:'',
                    designation:'',
                    date_of_birth:'',
                    salary:'',
                    annual_leaves:'',
                    cashual_laves:'',
                    medical_leaves:'',
                    id_probation:true
                });  
                return res.data;
                console.log(res.data);
                
            }catch(err) {
                console.error(err);
                return null;
            }

             
    }
    

//handle cancel    
    const handleCancel = (e)=>{
        e.preventDefault();
        setFormData({
            name:'',
            nic:'',
            email:'',
            phone:'',
            city:'',
            designation:'',
            date_of_birth:'',
            salary:'',
            annual_leaves:'',
            cashual_laves:'',
            medical_leaves:'',
            id_probation:true
        });        
    };

    
    
  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Employee</h1>
      <div className='border border-black rounded-[15px] m-7 p-9 items-center content-center'>
      <form>
        <div className='p-1 m-3'>
            <div className='flex-[50%]'>
                <label for='fname'>Full Name</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='name' 
                name='name' 
                type='text' 
                placeholder='Enter name'
                value={formData.name}
                onChange={handleChange}
                />
            </div>
        </div>
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label>NIC:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='nic' 
                name='nic' 
                type='text' 
                placeholder='Enter NIC'
                value={formData.nic}
                onChange={handleChange}
                />
            </div>
            <div className='flex-[50%]'>
                <label>Phone No:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='phone' 
                name='phone' 
                type='pnone' 
                placeholder='Enter phone number'
                value={formData.phone}
                onChange={handleChange}
                />
            </div>
        </div>
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label>Email:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='email' 
                name='email' 
                type='text' 
                placeholder='Enter email'
                value={formData.email}
                onChange={handleChange}/>
            </div>
            <div className='flex-[50%]'>
                <label>Date of Birth:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='date_of_birth' 
                name='date_of_birth' 
                type='date' 
                placeholder='Enter date_of_birth'
                value={formData.date_of_birth}
                onChange={handleChange}/>
            </div>
            
        </div>
        <div className='flex flex-wrap justify-start p-1 m-3'>
        <div className='flex-[50%]'>
            <label>Designation:</label><br/>
            <input 
            className='w-[90%] h-10 rounded-lg px-5' 
            id='designation' 
            name='designation' 
            type='text' 
            placeholder='Enter designation'
            value={formData.designation}
            onChange={handleChange}
            />
        </div>
        <div className='flex-[50%]'>
            <label>City:</label><br/>
            <input 
            className='w-[90%] h-10 rounded-lg px-5' 
            id='city' 
            name='city' 
            type='text' 
            placeholder='Enter city'
            value={formData.city}
            onChange={handleChange}
            />
        </div>
        </div>
        
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label>Base salary:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='salary' 
                name='salary' 
                type='text' 
                placeholder='Enter salary'
                value={formData.salary}
                onChange={handleChange}/>
            </div>
            <div className='flex-[50%]'>
                <label>No of Annual leaves:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='annual_leaves' 
                name='annual_leaves' 
                type='number' 
                placeholder='Enter annual leaves'
                value={formData.annual_leaves}
                onChange={handleChange}/>
            </div>
            
        </div>
        <div className='flex flex-wrap justify-start p-1 m-3'>
            <div className='flex-[50%]'>
                <label>No of Cashual leaves:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='cashual_laves' 
                name='cashual_laves' 
                type='number' 
                placeholder='Enter cashual laves'
                value={formData.cashual_laves}
                onChange={handleChange}/>
            </div>
            <div className='flex-[50%]'>
                <label>No of Medical leaves:</label><br/>
                <input 
                className='w-[90%] h-10 rounded-lg px-5' 
                id='medical_leaves' 
                name='medical_leaves' 
                type='number' 
                placeholder='Enter medical leaves'
                value={formData.medical_leaves}
                onChange={handleChange}/>
            </div>
            
        </div>
        <div className='p-1 m-3'>
            <input 
            className='w-[90%] h-10 rounded-lg px-5' 
            id='is_probation' 
            name='is_probation' 
            type='text' 
            placeholder='Enter is_probation'
            value={formData.is_probation}
            onChange={handleChange}
            hidden={true}
            />
        </div>
        <div className='flex flex-wrap content-center justify-center p-3 m-3 space-x-28'>
            <button className='px-5 py-2 text-white bg-blue-600 rounded-lg w-[100px]' onClick={handleOnClick}>save</button>
            <button className='px-5 py-2 rounded-lg bg-slate-100 w-[100px]' onClick={handleCancel}>cancel</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddEmployee
