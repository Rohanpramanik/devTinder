const express = require('express');

const app = express();

app.listen(5000, ()=>{
    console.log("server started on port 5000");
})

app.get("/",(req, res)=>{
    res.send("hello hello")
});

app.use("/test", (req, res)=>{
    res.send("hello from test")
})

app.use("/check", (req, res)=>{
    res.send("hello from check")
})