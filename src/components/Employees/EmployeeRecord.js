import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import { useNavigate } from 'react-router-dom';

function EmployeeRecord() {
    const [Employees , setEmployee] = useState([]);
    const [payments , setPayments] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/employeerecord")
        .then((res => setEmployee(res.data)));

        axios.get("http://localhost:8000/getpayment")
        .then((res => setPayments(res.data)));


    },[])


     const goBack = ()=>{
        navigate("/home");
    }

    const final = [...Employees]
    for(let i = 0; i < final.length; ++i){
        for(let j = 0; j < payments.length; ++j){
            if(final[i].phoneNo === payments[j].phone_no){
                final[i].fee = "paid";
            }
        }
    }


    return (
        <div>
            <h1 className='text-center mt-4'>Employees Record</h1>
            {console.log(final)}
            <table class="table table-striped">
                <thead>
                <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Phone No </th>
                <th scope="col">Address</th>
                <th scope="col">Designation </th>
                <th scope="col">Cnic </th>
                
                </tr>
            </thead>
            <tbody>
                {
                    final.map((obj) =>{
                        return(
                            <tr>
                                <td> {obj.workersName} </td>
                                <td>{obj.phoneNo}</td>
                                <td>{obj.designation}</td>
                                <td>{obj.address}</td>
                                <td>{obj.cnic}</td>
                                <td>{obj.fee}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>

                    <button onClick={goBack} className="btn btn-success" style={{marginLeft:"600px",marginTop:"20px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default EmployeeRecord
