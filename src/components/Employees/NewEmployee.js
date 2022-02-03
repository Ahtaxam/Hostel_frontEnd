import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewEmployee() {
    const [employeeName,setEmployeeName] = useState('');
    const [phoneNo , setPhoneNo] = useState('');
    const [address , setAddress] = useState('');
    const [designation , setDesignation] = useState('')
    const [cnic , setEmployeeCnic] = useState('')
    const [employees , setEmployees] = useState([])
    const [employeePhoneNos , setEmployeePhoneNos] = useState([])
    let navigate = useNavigate();
    

        
    useEffect(() =>{
        axios.get("http://localhost:8000/employeerecord")
        .then((res) =>
        {
            setEmployees(res.data);

        })
    },[])
    
    const handleSubmit = e =>{
        e.preventDefault();
        const employeePhoneNos = employees.map((res) => res.phoneNo);
        const filterPhoneNos = employeePhoneNos.filter(res =>res === phoneNo);
        if(filterPhoneNos.length >= 1){
            alert("Employee Already Exist")
        }
        else{
            let workersName = employeeName
            axios.post("http://localhost:8000/addemployee",{workersName,phoneNo,address,cnic,designation})
            .then((res) => alert("Employee Added "))
        }
        clearFields();
    }

    const handleEmployeeName = e =>{
        setEmployeeName(e.target.value)
    }

    

    const handleAddress = e =>{
        setAddress(e.target.value)
    }

    const handleCnicNo = e =>{
        setEmployeeCnic(e.target.value)
    }

    const handlePhoneNo = e =>{
        setPhoneNo(e.target.value)
    }

    const handleDesignation = e =>{
        setDesignation(e.target.value);
    }
    const clearFields = () =>{
        setEmployeeName('');
        setDesignation('')
        setAddress('');
        setPhoneNo('');
       setEmployeeCnic('')
    }
    const goBack = ()=>{
        navigate("/home");
    }
    return (
        <div>
            <h1 className='container text-center mt-4'>Add New Employee</h1>
            <form onSubmit={handleSubmit} className='container' style={{marginLeft:"500px",marginTop:"30px"}} >
            <div>
                <label>Name</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleEmployeeName}
                value={employeeName}
                required
                />
            </div>
            
            
            <div>
                <label>Permanent Address</label>
                &nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleAddress}
                value={address}
                required
                
                />
            </div>
           
            <div>
                <label>Cnic No</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleCnicNo}
                value={cnic}
                required
                />
            </div>
            <div>
                <label>Phone No</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handlePhoneNo}
                value={phoneNo}
                required
                />
            </div>
            <div>
                <label>Designation</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className='input-fields option' value={designation} onChange={handleDesignation}>
                    
                <option value="" disabled selected >Select Your Options</option>
                <option value="Accountant">Accountant</option>
                <option value="Mess Staff">Mess Staff</option>
                <option value="Cleaning Staff">Cleaning Staff</option>
                <option value="Hostel Incharge">Hostel Incharge</option>
                
                </select>
            </div>
            <input 
            className='btn btn-primary' 
            type='submit' 
            value="Register"
            style={{marginTop:'20px',marginLeft:"250px"}}
            />

        </form>
        <button onClick={goBack} className="btn btn-success" style={{marginLeft:"750px",marginTop:"20px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default NewEmployee
