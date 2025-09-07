const validator = require("validator");

const validateSignup = (req) => {
    const {firstName, lastName, emailId, password} = req?.body;
    if(!firstName || !emailId || !password){
        throw new Error("Name, Email and Password cannot be empty");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
}

module.exports = validateSignup;