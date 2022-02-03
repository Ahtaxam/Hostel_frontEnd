import Login from "./components/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import Rooms from './components/Rooms'
import AddRoom from "./components/AddRoom";
import UpdateRoom from "./components/UpdateRoom";
import RoomsRecord from "./components/RoomsRecord";
import RegisterStudent from "./components/students/RegisterStudent";
import UpdateStudent from "./components/students/UpdateStudent";
import LivingStudents from "./components/students/LivingStudents";
import SudentsFee from "./components/students/SudentsFee";
import HostelExpense from "./components/HostelExpense"
import NewEmployee from "./components/Employees/NewEmployee";
import UpdateEmployee from "./components/Employees/UpdateEmployee";
import EmployeePayment from "./components/Employees/EmployeePayment";
import EmployeeRecord from "./components/Employees/EmployeeRecord";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login/>}  ></Route>
          <Route path = '/home' element = {<Home/>} />
          <Route path = '/rooms' element = {<Rooms/>}></Route>
          <Route path = "/rooms/addroom" element = {<AddRoom/>}/>
          <Route path = "/rooms/updateroom" element = {<UpdateRoom/>}/>
          <Route path='/rooms/record' element = {<RoomsRecord/>}></Route>

          <Route path='/registerstudent'  element={<RegisterStudent/>}/>
          <Route path='/updatestudent' element={<UpdateStudent/>}/>
          <Route path='/livingstudents' element={<LivingStudents/>}/>
          <Route path='/hostelexpense' element={<HostelExpense/>}/>
          <Route path='/studentfee' element={<SudentsFee/>}/>
          <Route path = '/newemployee' element={<NewEmployee/>}/>
          <Route path="/updateemployee" element= {<UpdateEmployee/>}/>
          <Route path="/employeepayment" element={<EmployeePayment/>}/>
          <Route path="/employeerecord" element={<EmployeeRecord/>} / >
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
