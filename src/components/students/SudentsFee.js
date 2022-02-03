import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';

function SudentsFee() {
    const [name,setName] = useState('');
    const [phone_no,setPhoneNo] = useState('');
    const [date,setDate] = useState('');
    const [fee,setFee] = useState('');
    const [students,setStudents] = useState([])
    const [studentFee,setStudentFee] = useState([]);
    let navigate = useNavigate();
    useEffect(() =>{
        axios.get("http://localhost:8000/students")
        .then((res) =>{
            setStudents(res.data);
        })

        axios.get("http://localhost:8000/fee")
        .then((res) =>{
            setStudentFee(res.data);
        })

       
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
         
        const phoneNos = students.map((obj) => obj.phone_no);
        const filterPhoneNo = phoneNos.filter((obj) => obj === phone_no);
        console.log(students,phoneNos);
        if(filterPhoneNo.length <=0 ){
            alert("No Student exist !!");
        }
        else{
            const filterDate = studentFee.filter((res) => res.date.substring(5,7) === date.substring(5,7) && res.phone_no === phone_no);
            if(filterDate.length >= 1){
                alert("No More Fee For this month");
            }
            else{
                axios.post("http://localhost:8000/addfee" ,{
                    name,
                    phone_no,
                    date,
                    fee
                }).then((res) => alert("Fee Received !!"))
            }
        }

        
    }



    const handleName = (e)=>{
        setName(e.target.value)
    }

    const handlePhoneNo = (e)=>{
        setPhoneNo(e.target.value)
    }

    const handleDate = (e)=>{
        setDate(e.target.value)
    }

    const handleFee = (e)=>{
        setFee(e.target.value)
    }

    
    
     const goBack = ()=>{
        navigate("/home");
    }

    return (
        <div>
            <h1 className='text-center mt-4'>Students Fee</h1>

        <form className='container col-6' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="Name" className="form-label">Name</label>
                <input type="text" 
                className="form-control" 
                id="name" 
                aria-describedby="emailHelp"
                onChange={handleName}
                required
                
                />
            </div>

            <div className="mb-3">
                <label for="PhoneNo" className="form-label">PhoneNo</label>
                <input type="text" 
                className="form-control" 
                id="PhoneNo" 
                aria-describedby="emailHelp"
                onChange={handlePhoneNo}
                required
                />
            </div>


            <div className="mb-3">
                <label for="date" className="form-label">Date</label>
                <input type="date" 
                className="form-control" 
                id="date" 
                aria-describedby="emailHelp"
                onChange={handleDate}
                required
                />
            </div>

            <div className="mb-3">
                <label for="fee" className="form-label">Fee</label>
                <input type="text" 
                className="form-control" 
                id="fee" 
                aria-describedby="emailHelp"
                onChange={handleFee}
                required
                />
            </div>
            
            <button style={{marginLeft:"300px",marginTop:"20px"}} type="submit" className="btn btn-primary">Pay Fee</button>
        </form>

        <button onClick={goBack} className="btn btn-success" style={{marginLeft:"650px",marginTop:"20px",width:'150px'}}>Go Back</button>
        
        </div>
    )
}

export default SudentsFee
