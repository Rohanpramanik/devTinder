const userAuth = (req,res,next)=>{
    console.log("User handler 1");
    const key = "xyz"
    const isAuthorized = key === "xyz";
    if(isAuthorized){
        next();
    }else{
        res.status(401).send("unauthorized");
    }  
}

const adminAuth = (req,res,next)=>{
    console.log("Admin handler 1");
    const key = "xyz"
    const isAuthorized = key === "yz";
    if(isAuthorized){
        next();
    }else{
        res.status(401).send("unauthorized");
    }  
}

module.exports = {
    userAuth,
    adminAuth
}