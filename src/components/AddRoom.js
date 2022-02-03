import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddRoom() {
    const [room_no,setRoom]  = useState('');
    const [no_of_beds, setBed] = useState('');
    const [active,setActive] = useState(false);
    const [allRooms , setAllRooms] = useState([]);
    let navigate = useNavigate();
    useEffect(() =>{
        axios.get("http://localhost:8000/room").then((res) =>{
            setAllRooms(res.data)
        })
    },[])

    const handleChangeBed = e =>{
        setBed(e.target.value)
    }

    const handleChangeRoom = e =>{
        setRoom(e.target.value)
    }

    const handleChangeActive = e =>{
        setActive(e.target.checked)
    }

    const clearInputFields = () =>{
        setRoom('');
        setBed('');
    }
    const handleSubmission = e =>{
        e.preventDefault();
        console.log("submitted");
        const roomNo = allRooms.map((obj) => obj.room_no);
        const findUniqueRoomNo = roomNo.filter((obj) => obj === room_no);
        if(findUniqueRoomNo.length >= 1){
            alert("Room Already Exist !")
        }
        else{
             axios.post("http://localhost:8000/create",
            {room_no,no_of_beds,active})
            .then((res) =>console.log("Added"));

            const paraa = document.getElementById('paraa');
            paraa.style.display='block'
            const form = document.getElementById('form');
            form.style.marginTop="20px";
            
        }
        clearInputFields();
        
    }

    const goBack = ()=>{
        navigate("/rooms");
    }
    return (
        
        <div>
        <div>
            
            <h1 className='text-center mt-4'>Add New Room</h1>
        </div>
        <div className="alert alert-primary text-center col-6 mt-4 container"  id='paraa' style={{display:"none"}} role="alert">
            New Room has been Created
        </div>
        <form onSubmit={handleSubmission} className='container ' id='form' style={{marginLeft:"450px",marginTop:"50px"}} >
            <div class="mb-3 col-6">
                <label for="exampleInputText" className="form-label">Room Number:</label>
                <input type="text" 
                className="form-control" 
                id="exampleInputText" 
                aria-describedby="textHelp"
                name='room'
                onChange={handleChangeRoom}
                value={room_no}
                required
                />
            </div>
            <br/>
            <div class="mb-3 col-6">
                <label for="exampleInputText" className="form-label">No of Beds:</label>
                <input type="text" 
                className="form-control" 
                id="exampleInputText" 
                aria-describedby="textHelp"
                name='bed'
                onChange={handleChangeBed}
                value={no_of_beds}
                required
                />
            </div>
            <br/>
            <div class="mb-3">
                <label className="form-label">Active or Disable:</label> &nbsp;
                <input type="checkbox" 
                className="form-check-input" 
                name='active'
                onChange={handleChangeActive}
                value={active}
                
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{marginLeft:"100px",marginTop:"30px"}}>Add Room</button>
            
        </form>
         <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"50px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default AddRoom
