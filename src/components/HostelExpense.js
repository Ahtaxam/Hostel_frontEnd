import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

function HostelExpense() {
    const [expense,setExpense] = useState('')
    const [price,setPrice] = useState('');
    const [date,setDate] = useState('');
    const [hostelExpenses , setHostelExpenses] = useState([])
    let navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8000/expenses")
        .then((res) => setHostelExpenses(res.data))
    },[])
    const goBack = ()=>{
        navigate("/home");
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(expense,price,date);
       axios.post("http://localhost:8000/addexpense",{
           expense,date,price
       })
       .then(() =>{alert("Added Successsfully!!");navigate("/home");});
        
       setPrice('');
       setExpense('')
    }
    const handleDate = (e) =>{
        setDate(e.target.value)
    }
    const handleExpense = (e) =>{
        setExpense(e.target.value);
    }

    const handlePrice = (e) =>{
        setPrice(e.target.value)
    }
    return (
        <div>
            <h1 className='text-center mt-4'>Add Hostel Expenses</h1>
            <div className='row'>
                <form onSubmit={handleSubmit} className='m-4 col-4 ' style={{marginTop:"50px"}}>
                <div className="mb-3">
                    <div className="mb-3">
                        <label for="exampleInputText" className="form-label">Expense</label>
                        <input type="text" 
                        className="form-control" 
                        id="exampleInputText"
                        onChange={handleExpense}
                        />
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputText" className="form-label">Date</label>
                        <input type="date" 
                        className="form-control" 
                        id="exampleInputText"
                        onChange={handleDate}
                        
                        />
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputText" className="form-label">Price</label>
                        <input type="text" 
                        className="form-control" 
                        id="exampleInputText"
                        onChange={handlePrice}
                        
                        />
                    </div>
                </div>
                <button style={{marginLeft:"50px",marginTop:"20px",width:"150px"}} type="submit" className="btn btn-primary">Add Expense</button>
                </form>

                <div className='col-6'>
                    <h1 className='text-center mt-4'>Expense Record</h1>
                    <table style={{marginLeft:"60px"}} class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Expense</th>
                            <th scope="col">Date </th>
                            <th scope="col">Price </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                hostelExpenses.map((expense) => {
                                    return(
                                        <tr>
                                            <td>{expense.expense}</td>
                                            <td> {expense.date} </td>
                                            <td> {expense.price} </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <button onClick={goBack} className="btn btn-danger" style={{marginLeft:"280px",marginTop:"-110px",width:'140px'}}>Cancel</button>
        </div>
    )
}

export default HostelExpense
