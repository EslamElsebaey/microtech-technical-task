import React , {useEffect , useState } from 'react'
import axios from "axios";
import $ from "jquery"
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';


export default function Data() {


    let [employees, setEmployees] = useState([]);
    let [newEmployee, setNewEmployee] = useState({});

    
    
    


    async function getEmployees (){
      if(localStorage.getItem("myData")){
        let myData = JSON.parse(localStorage.getItem("myData")) ;
        setEmployees(myData)
      }else{
        let {data} = await axios.get("Employee.json");
        setEmployees(data)
        localStorage.setItem("myData" , JSON.stringify(data))
      }
    }


    
    function addEmployee(e){
      let myEmployee = {...newEmployee} ; 
      myEmployee[e.target.name] = e.target.value;
      myEmployee.Code = employees.length + 1 ; 
      setNewEmployee(myEmployee);
    }


    function addEmployeeAtPage(){
      if(Object.keys(newEmployee).length > 5){
        let myArray = [...employees] ; 
        myArray.push(newEmployee);
        localStorage.setItem("myData" , JSON.stringify(myArray));
        setEmployees(myArray);
        $(".firstname").val("");
        $(".lastname").val("")
        $(".email").val("")
        $(".birthdate").val("")
        $(".nationality").val("")
        alertify.success('Employee Added'); 

      }else{
        alertify.alert('Alert', 'You should fill the Inputs' );
      }
    }

 function openUpdateModal(){
    let employeeid = JSON.parse(localStorage.getItem("employeeid")) 
       let myData =  JSON.parse(localStorage.getItem("myData"))  ;
       let updatedEmployee =   myData.filter( (emp)=>{
        return Number(emp.Code) === Number(employeeid) 
      } )
      $(".modal-body .firstname").val( updatedEmployee[0].FirstNameEn);
      $(".modal-body .lastname").val( updatedEmployee[0].FamilyNameEn);
      $(".modal-body .email").val( updatedEmployee[0].Email);
      $(".modal-body .birthdate").val( updatedEmployee[0].BirthDate);
      $(".modal-body .nationality").val( updatedEmployee[0].Nationality);
    
 }


    
    function updateEmployee(){
         let employeeid = JSON.parse(localStorage.getItem("employeeid")) 
       let myData =  JSON.parse(localStorage.getItem("myData"))  ;
       let updatedEmployee =   myData.filter( (emp)=>{
        return Number(emp.Code) === Number(employeeid) 
      } )
        updatedEmployee[0].FirstNameEn = $(".firstname").val();
        updatedEmployee[0].FamilyNameEn = $(".lastname").val();
        updatedEmployee[0].Email = $(".email").val();
        updatedEmployee[0].BirthDate = $(".birthdate").val();
        updatedEmployee[0].Nationality = $(".nationality").val();
        localStorage.setItem("myData" , JSON.stringify(myData))
        setEmployees(myData)
        $(".firstname").val();
        $(".lastname").val();
        $(".birthdate").val();
        $(".email").val();
        $(".nationality").val();
        alertify.success('Employee Updated'); 
      
    }

    

    function getId(e){
      let employeeid = e.target.attributes.employeeid.value;
      localStorage.setItem("employeeid" , JSON.stringify(employeeid));
    }


      useEffect(() => {
        getEmployees();
      }, []);

      
    return (
    <>
{/* Modal */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Update Employee</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          <input name="FirstNameEn"  placeholder='First Name' className='form-control mb-4 firstname' type="text" />
          <input name="FamilyNameEn"  placeholder='Last Name' className='form-control mb-4 lastname' type="text" />
          <input name="Email"  placeholder='Email' className='form-control mb-4 email' type="text" />
          <input name="BirthDate"  placeholder='Birth Date' className='form-control mb-4 birthdate' type="text" />
          <input name="Nationality"  placeholder='Nationality' className='form-control mb-4 nationality' type="text" />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={updateEmployee}   data-bs-dismiss="modal" className="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
    {/* ************************************************************************** */}
    <div className="employees">
        <div className="container">
    <div className="row g-4">
        <div className="col-md-12 empdetails" >
          <h1 className='text-center '>Employees Details</h1>
        </div>
    <div className=" col-md-6 form-order">
        <div className="myForm shadow p-3">
            <input name="FirstNameEn" onInput={ (event)=>{ addEmployee(event)}}  placeholder='First Name' className='form-control mb-4  firstname' type="text" />
          <input name="FamilyNameEn"  onInput={ (event)=>{ addEmployee(event)}} placeholder='Family Name' className='form-control mb-4 lastname ' type="text" />
          <input name="Email"  onInput={ (event)=>{ addEmployee(event)}} placeholder='Email' className='form-control mb-4 email  ' type="email" />
          <input name="BirthDate" onInput={ (event)=>{ addEmployee(event)}}  placeholder='Birth Date ex: 1/1/2000' className='form-control  mb-4 birthdate' type="text" />
          <input name="Nationality" onInput={ (event)=>{ addEmployee(event)}}  placeholder='Nationality' className='form-control mb-4  nationality' type="text" />
         <button onClick={addEmployeeAtPage} id="addPostBtn"  className='btn btn-primary '>Add Employee</button>
        </div>
    </div>
              <div className="   col-md-6 number-order bg-white  shadow align-self-start ">
                <div className='text-center text-black fs-4 p-4'>
                  Number Of Employees (<span className='postsNum'>{employees.length}</span>)
                </div>
              </div>
                {employees.map((employee , index)=>{
                    return <React.Fragment key={index}>
                    <div className="col-lg-4 col-md-6 text-center">
                    <div className="employee-item shadow p-4">
                    <h4 className='text-capitalize'> First name: {employee.FirstNameEn}</h4>
                    <h5 className='text-capitalize'> Family name:  {employee.FamilyNameEn}</h5>
                        <h6>Email: {employee.Email}</h6>
                        <p>Birth of Date: {employee.BirthDate}</p>
                        <p className='text-capitalize'>Nationlity:  {employee.Nationality}</p>
                        <div className="updatebtn" onClick={openUpdateModal}>
                        <button data-bs-toggle="modal" employeeid={employee.Code}   data-bs-target="#staticBackdrop"  className='btn updateBtn btn-info'  onClick={getId}  >Update</button>
                        </div>
                      
                    </div>
                    </div>
                    </React.Fragment>
                })}
            </div>
        </div>
    </div>
    </>
  )
}
