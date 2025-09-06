const express = require('express');
const {userAuth, adminAuth} = require('./middleware/Authentication');

const app = express();

// app.use("/user", userAuth);
app.use("/admin", adminAuth);

app.get("/user/login",(req,res)=>{
    console.log("login ho gya")
    res.send("its login");
});

app.get("/user/profile", userAuth ,(req,res)=>{
    console.log("handler 2")
    res.send("its reacched");
});

app.get("/admin/getData",(req,res)=>{
    console.log("admin getData")
    res.send("admin data reacched");
});


app.listen(5000, ()=>{
    console.log("server started on port 5000");
})