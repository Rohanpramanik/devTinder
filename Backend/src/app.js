const express = require('express');

const app = express();

app.listen(5000, ()=>{
    console.log("server started on port 5000");
})

app.get("/abc",(req, res)=>{
    res.send("hello hello")
});

app.get("/test/:roh", (req, res)=>{
    console.log(req.params);
    res.send("hello from test")
})

// http://localhost:5000/test?userId=78&password=itsme
app.get("/test", (req, res)=>{
    console.log(req.query);
    // { userId: '78', password: 'itsme' }
    res.send("hello from test")
})  

// matches for all if it start with ab and end with de
app.get("/ab*de", (req, res)=>{
    res.send({name:"rohan",age:25})
})