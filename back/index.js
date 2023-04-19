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
    let querty=`select ps.patient_id,b.visit_type,b.visit_code,ps.last_modified_by,hu.user_name,dm.description,ps.last_modified_date_time,ps.credit_limit,ps.credit_type,ps.pharmacy_material_credit_limit,ps.pharmacy_material_credit_type,ps.credit_amount from patient_account_summary ps
    left join bill b on ps.patient_id=b.patient_id
    left join his_user hu on ps.last_modified_by=hu.user_login
    left join staff_master sm on hu.user_staff_id=sm.id
    left join department_master dm on sm.dept_id= dm.id
    
    where ps.patient_id='${req.query.MRD}' and visit_type='ip' and visit_code like(select visit_code from his_db_29032023.bill where patient_id='${req.query.MRD}' and visit_type like 'ip%'  order by visit_code desc limit 1)
    order by ps.visit_id desc`

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
