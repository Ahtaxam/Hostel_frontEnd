import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
function Home() {
    return (
        <div>
            <div className='header'>
                <h1 className="text-center mt-2">Hostel Application System</h1>
            </div>
            
            <div className='nav-items'>
                <Link to='/rooms' className='list'>
                    Manage Rooms
                </Link>

                <Link to='/registerstudent' className='list'>
                    New Students
                </Link>

                <Link to='/updatestudent' className='list'>
                    Change Student Room
                </Link>

                <Link to='/studentfee' className='list'>
                    Student Fees
                </Link>

                <Link to='/livingstudents' className='list'>
                    All Living Students 
                </Link>

                <Link to='/hostelexpense' className='list l'>
                    Hostel Expense 
                </Link>

                <Link to='/newemployee' className='list'>
                    New Employees 
                </Link>

                <Link to='/updateemployee' className='list'>
                    Update Emplyoe Record
                </Link>

                <Link to='/employeepayment' className='list'>
                    Employee Payment
                </Link>

                <Link to='/employeerecord' className='list'>
                    Employee Record
                </Link>
            </div>
        </div>
    )
}

export default Home
