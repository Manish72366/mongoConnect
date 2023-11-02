const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    tokens :[
        {
            token:{
               type : String,
               required:true 
            }
        }
    ]
})

// generateAuthToken is called by 
employeeSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id : this._id.toString()} , "myselfmanishmamgainandbrothermayank");
        console.log(token); // i got a token so i have to make a field in my db for token to store and to access it..
        this.tokens = this.tokens.concat({token : token});
        await this.save(); // to save the object
        return token;
    }catch(err)
    {
        console.log(`The error part ${err}`);
          res.send(`The error part`);
    }
}

// below is the pre method which works as middle ware between save method which is written in the app.js to save data to db and and a function (means ye function phele kaam karega save ke)
// now we can't use arrow fucntion as this property is not applicable in arrow function.
// bcrypt methods are async so they returns a promise so we have to wait for then by await.

employeeSchema.pre("save" ,async function(next) {
    if(this.isModified("password")) // this i added to just want password to be update when user first time register or updating the password.isModified tells that kya password modified hua
    {
        this.password = await bcrypt.hash(this.password , 8);
        // this.confirmPassword = await bcrypt.hash(this.confirmPassword , 8);
        // this.confirmPassword = undefined;
    }
    next(); // to now call save method. and it is too much important
})
// now we need to create a collection
const Register = new mongoose.model("Register" , employeeSchema); // Register(first capital and singular always) is the collection which will form in your mongo compass and its prulal will named registers and the database will be jnvEmployees as it we connected earlier
module.exports = Register;