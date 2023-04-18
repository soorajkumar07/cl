import { React,useState } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment'
function App() {

  const [list,setlist]=useState([])
  const[MRDNum,setMRDNum]=useState()


  const getBill=() =>{

    let params={
      "MRD":MRDNum
    }
axios.get("http://10.125.15.52:9000/get",{params}).then((Responce) => {


setlist(Responce.data)  
// console.log(Response)
console.log ("got the data")


  
}).catch((err) => {
  console.log(err)
});




  }




  return (
    <div className="App">
      
      <div className="main3">

      <h3>Credit Limit</h3>

      <label>MRD: </label>

      <input className='text'
        type={"text"}
        onChange={(event) => {
          setMRDNum(event.target.value);
          // console.log(event.target.value)
        }}
      />


      <button className="btn" onClick={getBill}>
        get details
      </button>
    </div>

      <table className='table' border={5} cellPadding={10}>
        <thead>
        <tr  className='tableraw'>
          <th>Patient_id</th>
        <th>Visit_Type</th>
        <th>Visit_Code</th>
        <th>Last_Modified_By</th>
        <th>Staff_Display_Name</th>
        <th>Description</th>
        <th>Last_Modified_Date_Time</th>
        <th>Cedit_Amount</th>
        <th>Credit_Limit</th>
        <th>Credit_Type</th>
        <th>Pharmacy_Material_Credit_Limit</th>
        <th>Pharmacy_Material_Credit_Type</th>
        </tr>
        </thead>


          <tbody>
          {list.map((val)=>{

            return(
              <tr className='tabraw'>

                <td>{val.patient_id}</td>

                

                <td>{val.visit_code}</td>

                <td>{val.visit_type}</td>

                <td>{val.last_modified_by}</td>

                <td>{val.user_name}</td>

                <td>{val.description}</td>

                <td>{moment(val.last_modified_date_time).format('MMM Do YYYY, h:mm:ss a')}</td>

                <td>{val.credit_amount}</td>

                <td>{val.credit_limit}</td>

                <td>{val.credit_type}</td>

                <td>{val.pharmacy_material_credit_limit}</td>

                <td>{val.pharmacy_material_credit_type}</td>
              </tr>
            )
          })}
          </tbody>

       </table>



</div>
  );
}

export default App;
