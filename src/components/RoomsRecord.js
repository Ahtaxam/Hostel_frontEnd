import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';

function RoomsRecord() {
    const [allRooms,setAllRooms] = useState([]);
    let navigate = useNavigate();
    useEffect(() =>{
        axios.get("http://localhost:8000/room")
        .then(res => setAllRooms(res.data));
        
    },[])
     const goBack = ()=>{
        navigate("/rooms");
    }
    return (
        <div>
            {console.log(allRooms)}
            <h1 className='text-center mt-4'>Rooms Record</h1>

            <table className="table table-striped container mt-4">
            <thead>
                <tr>
                <th scope="col">Room No</th>
                <th scope="col">No of Beds</th>
                <th scope="col">Living Students</th>
                <th scope="col">Active or Deactive</th>
                <th scope="col">Full or Not</th>
                </tr>
            </thead>
            <tbody>
                {
                    allRooms.map(obj =>{
                        return(
                            <tr key={obj.id}>
                                <td>{obj.room_no}</td>
                                <td>{obj.no_of_beds}</td>
                                <td>{obj.living_student}</td>
                                <td>{obj.active ? "Active":"Deactive"}</td>
                                <td> {obj.living_student == obj.no_of_beds ? "Full" :"Not Full"} </td>
                            </tr>
                        )})
                }
                
            </tbody>
            </table>
            <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"50px",width:'150px'}}>Go Back</button>
        </div>
    )
}

export default RoomsRecord
