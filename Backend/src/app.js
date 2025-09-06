const express = require('express');
const {userAuth, adminAuth} = require('./middleware/Authentication');

const app = express();

app.use("/getUserData", (req,res)=>{
    try{
        //Logic of DB to get data
        throw new Error('some error');
        res.send("user data send");
    }catch(err){
        res.status(500).send("something went wrong in try");
    } 
});

app.use((err, req, res, next)=>{
    console.log("erro 2")
    if(err){
        res.status(500).send("something went wrong 2");
    }
});



app.listen(5000, ()=>{
    console.log("server started on port 5000");
})