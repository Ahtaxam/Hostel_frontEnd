import React, { useState } from 'react'
import '../App.css'
import { Link, Navigate } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

function Login () {
    const [state, setstate] = useState({userName:'',password:''})
    let navigate = useNavigate();
    
    const HandleSubmit = (e) =>{
        e.preventDefault();
        const {userName , password} = state;
        console.log(userName,password);
        if(userName === 'admin' && password === 'admin'){
            navigate('/home');
        }
        else{
            alert("Invalid Credentials")
        }

    }
    const handleChange = (e) =>{
        const account = {...state}
        account[e.target.name]=e.target.value
        setstate({...account})
    }
        return (
            <div className='body'>
                
                <div className='main-div'>
                    <h1 className='heading'>Login</h1>
                    <hr></hr>
                    <form className='form'>
                        <input type='text' placeholder='Username'
                        className='input'
                        name='userName'
                        onChange={handleChange}
                        
                        /> 
                        <br/>

                        <input type='password' placeholder='Password'
                        className='input'
                        name='password'                
                        onChange={handleChange}
                        /> <br/>
                        <button className='button' onClick={HandleSubmit} >Login</button>
                    </form>

                </div>

                   
                
            </div>
        )
    }


export default Login
