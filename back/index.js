const express = require('express');
 const app=express();


const mysql = require('mysql');

const cors=require('cors');


app.use(cors())

app.use(express.json());


// database connection


const db=mysql.createConnection({

 user: "fbdro",
  host: "10.125.20.10",
  password: "fbdro",
  database: "his_db_29032023",
})


// putting the information


app.post("/enter",(req, res) => {

    const MRD=req.body.MRD   
    let query="INSERT INTO bill (patient_id) VALUE(?)"

    db.query(query,[MRDNum],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("result entered")
        }
    })

})


// getting the data from the db

app.get("/get",(req,res)=>{
    let querty=`select pm.full_name,pcm.description as Patient_category ,spm.description as Patient_Speciality,pas.last_modified_by,
    hu.user_name,dm.description,pas.last_modified_date_time,pas.credit_limit,pas.credit_amount,
    pas.credit_type,pas.pharmacy_material_credit_limit,pas.pharmacy_material_credit_type,v.visit_code 
    from patient_account_summary pas
    left join visit v on
    pas.visit_id=v.id 
    inner join patient_master pm on
    pas.patient_id=pm.id 
    inner join his_user hu on
    pas.last_modified_by=hu.user_login
    inner join staff_master stm on
    hu.user_staff_id=stm.id 
    inner join department_master dm on
    stm.dept_id=dm.id
    inner join patient_category_master pcm on
    pm.category_id=pcm.id
    inner join admission a on
     pas.visit_id=a.visit_id 
    inner join speciality_master spm on
    a.speciality_id=spm.id
    where visit_code like(select visit_code from his_db_29032023.visit where patient_id= '${req.query.MRD}' and visit_type like 'ip%'  order by visit_code desc limit 1)
    and pas.patient_id='${req.query.MRD}'

    db.query(querty,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })


})












app.listen(9000,()=>{
    console.log("listening ")
})
