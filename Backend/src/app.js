const express = require('express');
const {userAuth, adminAuth} = require('./middleware/Authentication');

const app = express();

app.use("/getUserData", (req,res)=>{
    //Logic of DB to get data

    throw new Error('some error');
    res.send("user data send");
});

app.use("/", (err, req, res, next)=>{
    if(err){
        // res.status(500).send("something went wrong 1");
        console.log("erro 1")
    }
    next(err);
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