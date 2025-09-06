const express = require('express');

const app = express();

app.use("/user",(req,res,next)=>{
        console.log("Router handler 1");
        // res.send("Route handler 1")
        next();
    },(req,res)=>{
        console.log("Router handler 2")
        res.send("Route handler 2")
    }
);

app.listen(5000, ()=>{
    console.log("server started on port 5000");
})