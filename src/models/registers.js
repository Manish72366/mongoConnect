const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    phone:{
        type : Number,
        required : true,
        unique: true
    },
    dob:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    street:{
        type : String,
        required : true
    },
    country:{
        type : String,
        required : true
    },
    city:{
        type : String,
        required : true
    },
    state:{
        type : String,
        required : true
    },
    Pincode:{
        type : Number,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    confirmPassword:{
        type : String,
        required : true
    },
})
// now we need to create a collections
const Register = new mongoose.model("Register" , employeeSchema); // Register(first capital and singular always) is the collection which will form in your mongo compass and its prulal will named registers and the database will be jnvEmployees as it we connected earlier
module.exports = Register;