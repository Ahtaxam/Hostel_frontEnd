import axios from 'axios';
import React ,{ useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import "./student.css"


function UpdateStudent() {
    const [student_name,setStudentName] = useState('');
    const [father_name,setFatherName] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [student_cnic,setStudentCnic] = useState('');
    const [phone_no,setPhoneNo] = useState('');
    const [college_name , setCollegeName] = useState('');
    const [room_no,setRoomNo] = useState('');
    const [availableRooms,setAvailableRooms] = useState([]);
    const [studentsPhoneNo,setStudentsPhoneNo] = useState([])
    // const [getStudentRecord,setGetStudentRecord] = useState([])
    let navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/room")
        .then((res)=>{
            const rooms = res.data;
            const newRooms = rooms.map((room) =>room.active && room.living_student < room.no_of_beds? room.room_no:'')
            const filterRooms = newRooms.filter((obj) => obj != '');
            setAvailableRooms(filterRooms)
        })

        axios.get("http://localhost:8000/students")
        .then((res) =>{
            setStudentsPhoneNo(res.data)
        })
        
        
    },[])

    const handleSubmit = e =>{
        e.preventDefault();
        const phoneNo = document.getElementById('phoneNo').value;
        axios.get(`http://localhost:8000/room/${room_no}`)
        .then((res) =>{
        const room_no = res.data.room_no;
        const no_of_beds = res.data.no_of_beds;
        let living_student = res.data.living_student;
        const active = res.data.active;
        living_student = living_student + 1;
        const roomNo = room_no;
        axios.put(`http://localhost:8000/update/${roomNo}`,{
        room_no,
        no_of_beds,
        living_student,
        active
        }).then(() => {
            axios.put(`http://localhost:8000/update_student/${phoneNo}`,{
            student_name,father_name,email,address,student_cnic,phone_no,college_name,room_no
        })
        .then(() =>alert("Updated "))
        })

        
        })
            clearFields();
            document.getElementById('phoneNo').value = '';
    }

    const getStudentRecord = () =>{
        const phoneNo = document.getElementById('phoneNo').value;
        const phoneNoRecord = studentsPhoneNo.map((obj) =>obj.phone_no);
        const filterPhoneNo = phoneNoRecord.filter((res) => res == phoneNo);
        console.log(filterPhoneNo);
        if(filterPhoneNo.length <= 0){
            alert("No Student exist")
        }
        else
        {
            
            axios.get(`http://localhost:8000/student/${phoneNo}`)
            .then((res) =>{
                setStudentName(res.data.student_name);
                setFatherName(res.data.father_name);
                setEmail(res.data.email);
                setAddress(res.data.address);
                setStudentCnic(res.data.student_cnic);
                setPhoneNo(res.data.phone_no);
                setCollegeName(res.data.college_name);
                setRoomNo(res.data.room_no);

                axios.get(`http://localhost:8000/room/${res.data.room_no}`)
            .then((res) =>{
                const room_no = res.data.room_no;
                const no_of_beds = res.data.no_of_beds;
                let living_student = res.data.living_student;
                const active = res.data.active;
                living_student = living_student - 1;
            
            axios.put(`http://localhost:8000/update/${room_no}`,{
            room_no,
            no_of_beds,
            living_student,
            active
            }).then(() => console.log("Successfully Updated!!"))
            })
            })
            
        }
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

    const DeleteStudent = () =>{
        const phoneNo = document.getElementById('phoneNo').value;
        let confirm = window.confirm("Do you want to delete ?");
        if(confirm === true){
        axios.delete(`http://localhost:8000/delete_student/${phoneNo}`)
        .then(() =>alert("Deleted Successfully !!"))
        clearFields();
        document.getElementById('phoneNo').value = '';
        }
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
           
            <h1 className='text-center mt-4'>Update Student</h1>
            <input type="text" 
            className='search-field'
            placeholder='Search By Phone no'
            id='phoneNo'
            
            />
            <button onClick={getStudentRecord}style={{marginLeft:"40px"}} className='btn btn-primary'>Search</button>
        <form onSubmit={handleSubmit} className='container' style={{marginLeft:"500px",marginTop:"0px"}} >
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
                
                {availableRooms.map((room)=><option key={room} value={room}>{room}</option>)}
                </select>

            </div>
            <input 
            className='btn btn-primary' 
            type='submit' 
            value="Update Record"
            style={{marginTop:'20px',marginLeft:"160px"}}
            />

        </form>
        <button className='btn btn-danger delete'  onClick={DeleteStudent}>Delete</button>
        <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"10px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default UpdateStudent
