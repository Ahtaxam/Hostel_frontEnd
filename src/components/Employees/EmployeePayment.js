import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';


function EmployeePayment() {
    const [name,setName] = useState('');
    const [phone_no,setPhoneNo] = useState('');
    const [date,setDate] = useState('');
    const [payment,setPayment] = useState('');
    const [payments,setPayments] = useState([])
    const [paid,setPaid] = useState([]);
    let navigate = useNavigate();

    useEffect(() =>{
        getDataFromServer()
    },[])

    const getDataFromServer = async () =>{
        await axios.get("http://localhost:8000/employeerecord")
        .then((res) =>setPayments(res.data))

        await axios.get("http://localhost:8000/getpayment")
        .then((res) =>setPaid(res.data))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const employees = payments.map((res => res.phoneNo));
        const filterEmployee = employees.filter((res) => res === phone_no);
        if(filterEmployee.length <= 0){
            alert("No Employee Exist")
        }
        else{
            const filterDate = paid.filter((res) => res.date.substring(5,7) === date.substring(5,7) && res.phone_no === phone_no);
            if(filterDate.length >= 1){
                alert("Already Paid For This Month");
               
            }
            else{
                axios.post("http://localhost:8000/paypayment" , {
                    name,phone_no,date,payment
                })
                .then(() => {alert("Paid ");navigate('/home')})

            }
        }
         clearFields();
        
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

    const handlePayment = (e)=>{
        setPayment(e.target.value)
    }

    const clearFields = () =>{
        setName('');
        setPhoneNo('');
        setDate('');
        setPayment('');
        
    }

    const goBack = () =>{
        navigate('/home')
    }
    
    return (
        <div>
            <h1 className='text-center mt-4'>Employee Payment</h1>
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
                <label for="fee" className="form-label">Pay</label>
                <input type="text" 
                className="form-control" 
                id="fee" 
                aria-describedby="emailHelp"
                onChange={handlePayment}
                required
                />
            </div>
            
            <button style={{marginLeft:"200px",marginTop:"20px"}} type="submit" className="btn btn-primary">Pay</button>
        </form>

        <button onClick={goBack} style={{marginLeft:"750px",marginTop:"-50px"}} className='btn btn-danger'>Cancel</button>
       </div>
    )
}

export default EmployeePayment
