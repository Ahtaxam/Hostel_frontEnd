import React ,{ useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UpdateEmployee() {
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
        let searchValue = document.getElementById('searchfields').value;
        console.log(searchValue);
        let workersName = employeeName
        axios.put(`http://localhost:8000/updateworker/${searchValue}`,
        {workersName,phoneNo,address,cnic,designation})
        .then((res) => alert("Employee Record  Updated !!"))
        
            
        clearFields();
    }

    const handleSearchText = () =>{
        let searchValue = document.getElementById('searchfields').value;
        const employeePhoneNos = employees.map((res) => res.phoneNo);
        const filterPhoneNos = employeePhoneNos.filter(res =>res === searchValue);
        if(filterPhoneNos.length <= 0){
            alert("Employee Does Not exist !!")
        }
        else{
            axios.get(`http://localhost:8000/employeeid/${searchValue}`)
        .then((res) => {
            setEmployeeName(res.data.workersName);
            setPhoneNo(res.data.phoneNo);
            setEmployeeCnic(res.data.cnic)
            setAddress(res.data.address)
            setDesignation(res.data.designation)
        })
        }
    }

    const handleDelete = (e) =>{
        let searchValue = document.getElementById('searchfields').value;
        const employeePhoneNos = employees.map((res) => res.phoneNo);
        const filterPhoneNos = employeePhoneNos.filter(res =>res === searchValue);
        if(filterPhoneNos.length <= 0){
            alert("Employee Does Not exist !!")
        }
        else{
            let confirm = window.confirm('Do you want to delete !!');
            if(confirm){
                axios.delete(`http://localhost:8000/deleteworker/${searchValue}`)
            .then(() =>alert('Deleted Successfully !!'))
            }
            
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
            <h1 className='text-center mt-4'>Update Employee Record</h1>
            <input type='text' 
                id='searchfields'
                className='input-fields'
                style={{marginLeft:"520px"}}
                required
                />
                <button onClick={handleSearchText} style={{marginLeft:"30px" , marginTop:"20px"}} className='btn btn-primary'>Search</button>
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
            value="Update"
            style={{marginTop:'20px',marginLeft:"200px"}}
            />

        </form>
        <button className='btn btn-danger' style={{marginLeft:"850px",marginTop:"-60px"}} onClick={handleDelete}>Delete</button>
        <button onClick={goBack} className="btn btn-success" style={{marginLeft:"750px",marginTop:"20px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default UpdateEmployee
