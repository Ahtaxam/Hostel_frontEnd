import React from 'react'
import {Link} from 'react-router-dom'
import './rooms.css'
import { useNavigate } from 'react-router-dom';

function Rooms() {
    let navigate = useNavigate();

    const goBack = ()=>{
        navigate("/home");
    }
    return (
        <div>
            <h1 className='text-center mt-4'>Manage Rooms</h1>
            <div className='nav'>
            <Link to='/rooms/addroom' className='link f'>
                Add New Room
            </Link>

            <Link to='/rooms/record' className='link last'>
                Rooms record
            </Link>

            <Link to='/rooms/updateroom' className='link last'>
                Update Delete Room
            </Link>

            <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"50px",width:'150px'}}>Go Back</button>
            </div>
        </div>
    )
}
export default Rooms
