import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { useNavigate } from 'react-router-dom';

function LivingStudents() {
    const [students,setStudents] = useState([])
    const [studentsFee,setStudentFee] = useState([]);
    let final = [...students]
    let navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/students")
        .then((res)=>setStudents(res.data))


        axios.get("http://localhost:8000/fee")
        .then((res) =>{
            setStudentFee(res.data);
        })
    },[])


     const goBack = ()=>{
        navigate("/home");
    }
    
    students.forEach((stu) =>{
        studentsFee.forEach((fee) =>{
            if(stu.phone_no === fee.phone_no){
                for(let i = 0; i < final.length; ++i){
                    if(final[i].phone_no === stu.phone_no){
                        final[i].fees = "paid"
                    }
                }
            }
            
        })

        
    })
    return (
        <div>
            <h1 className='text-center mt-4'>Living Students Data</h1>
            <table className="table table-striped  mt-4">
            <thead>
                <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Father Name</th>
                <th scope="col">Email</th>
                <th scope="col">Permanent Address</th>
                <th scope="col">Cnic</th>
                <th scope="col">College Name</th>
                <th scope="col">Phone No</th>
                <th scope="col">Room No</th>
                <th scope='col'>Fee Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    final.map((obj) =>{
                        return(
                        <tr key={obj.phone_no}>
                            <td>{obj.student_name}</td>
                            <td>{obj.father_name}</td>
                            <td>{obj.email}</td>
                            <td>{obj.address}</td>
                            <td>{obj.student_cnic}</td>
                            <td>{obj.college_name}</td>
                            <td>{obj.phone_no}</td>
                            <td>{obj.room_no}</td>
                            <td>{obj.fees}</td>
                            
                            
                            
                            
                        </tr>
                    )})
                }
            </tbody>
            </table>

            <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"20px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default LivingStudents
