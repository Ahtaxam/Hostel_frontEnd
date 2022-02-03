import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./student.css"
import { useNavigate } from 'react-router-dom';
function RegisterStudent() {
    const [student_name,setStudentName] = useState('');
    const [father_name,setFatherName] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [student_cnic,setStudentCnic] = useState('');
    const [phone_no,setPhoneNo] = useState('');
    const [college_name , setCollegeName] = useState('');
    const [room_no,setRoomNo] = useState('');
    const [availableRooms,setAvailableRooms] = useState([]);
    const [getStudentRecord,setGetStudentRecord] = useState([])
    let navigate = useNavigate();
    useEffect(() =>{
        axios.get("http://localhost:8000/room")
        .then((res)=>{
            const rooms = res.data;
            const newRooms = rooms.map((room) =>room.active && room.living_student < room.no_of_beds? room.room_no:'')
            const filterRooms = newRooms.filter((obj) => obj != '');
            setAvailableRooms(filterRooms)
        })

        
        
    },[])
    
    const handleSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:8000/registerstudent",{
            student_name,father_name,email,address,student_cnic,phone_no,college_name,room_no
        })
        .then(res =>alert("Student Admitted!!"));
        axios.get(`http://localhost:8000/room/${room_no}`)
        .then((res) =>{
            const room_no = res.data.room_no;
            const no_of_beds = res.data.no_of_beds;
            let living_student = res.data.living_student;
            const active = res.data.active;
            living_student = living_student + 1;
            axios.put(`http://localhost:8000/update/${room_no}`,{
            room_no,
            no_of_beds,
            living_student,
            active
        }).then(() => console.log("Successfully Updated!!"))
        })
        clearFields();
    }

    const handleStudenName = e =>{
        setStudentName(e.target.value)
    }

    const handleFatherName = e =>{
        setFatherName(e.target.value)
    }

    const handleEmail = e =>{
        setEmail(e.target.value)
    }

    const handleAddress = e =>{
        setAddress(e.target.value)
    }

    const handleCnicNo = e =>{
        setStudentCnic(e.target.value)
    }

    const handlePhoneNo = e =>{
        setPhoneNo(e.target.value)
    }

    const handleCollegeName = e =>{
        setCollegeName(e.target.value)
    }

    const handleRoomNo = e =>{
        setRoomNo(e.target.value)
    }

    const clearFields = () =>{
        setStudentName('');
        setFatherName('');
        setEmail('');
        setAddress('');
        setPhoneNo('');
        setStudentCnic('');
        setCollegeName('')
    }
    const goBack = ()=>{
        navigate("/home");
    }
    return (
        
        <div>
           
            <h1 className='text-center mt-4'>Register Student</h1>
        <form onSubmit={handleSubmit} className='container' style={{marginLeft:"500px",marginTop:"30px"}} >
            <div>
                <label>Name</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleStudenName}
                value={student_name}
                required
                />
            </div>
            <div>
                <label>Father Name</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleFatherName}
                value={father_name}
                required
                />
            </div>
            <div>
                <label>Email Address</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='email' 
                className='input-fields'
                onChange={handleEmail}
                value={email}
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
                <label>College Name</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleCollegeName}
                value={college_name}
                required
                
                />
            </div>
            <div>
                <label>Cnic No</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handleCnicNo}
                value={student_cnic}
                required
                />
            </div>
            <div>
                <label>Phone No</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text' 
                className='input-fields'
                onChange={handlePhoneNo}
                value={phone_no}
                required
                />
            </div>
            <div>
                <label>Room No</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <input type='text' className='input-fields'/> */}
                <select className='input-fields option' value={room_no} onChange={handleRoomNo}>
                <option value="" disabled selected>Select Your Options</option>
                {availableRooms.map((room)=><option key={room} value={room}>{room}</option>)}
                </select>

            </div>
            <input 
            className='btn btn-primary' 
            type='submit' 
            value="Register"
            style={{marginTop:'20px',marginLeft:"250px"}}
            />

        </form>
        <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"10px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default RegisterStudent
