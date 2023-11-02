const express = require("express");
const app = express(); // so app ke ander express ki properties , methods and all other things came.
const path = require("path");
const bcrypt = require("bcryptjs");
const hbs = require("hbs");
require("./db/conn");
// want to use json file in my app so then i can store the data
app.use(express.json());
app.use(express.urlencoded({extended:false})); // this means that whatever data i am getting from the file i want it to me. u can't show undefined data.
const Register = require("./models/registers");
const port = process.env.PORT || 8000; // process.env.PORT means that we please provide a port number for any user in any system and 3000 for localhost.
// static ->
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path)); // using that html file which is inside the public folder
// so below line will show you the index page always this is same as by default.

//views -> 
app.set("views", path.join(__dirname, "../views")); // adding the view path here two dots as it is inside the mongoDB 
app.set("view engine","hbs") // you can only use template not plain html inside the views else use in the static folder (public)
// below is for those which we will use again and again.

// partials hbs-> 
const partials_path = path.join(__dirname , "../views/partials");
hbs.registerPartials(partials_path);
app.get("/" , (req, res) =>
{
//    res.send("Hello from the Manish");
      res.render("index");
})
app.get("/register" , (req, res) =>
{
//    res.send("Hello from the Manish");
      res.render("register");
})
// create a new user in our database
app.post("/register", async (req, res) =>
{
    try{
      const password = req.body.password;
      const cpassword = req.body.confirmPassword;
      const phoneLen = req.body.phone;
      if(phoneLen.length != 10) res.status(400).send("please enter a correct number it's my humble request");
      if(password !== cpassword) res.status(400).send("password should be same with confirm password");
      else
      {
            // data created.registerEmployee is instance of Register means (document) hai..
           const registerEmployee =  new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            phone : req.body. phone,
            dob : req.body.dob,
            gender : req.body.gender,
            street : req.body.street,
            country : req.body.country,
            city : req.body.city,
            state : req.body.state,
            Pincode : req.body.Pincode,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
           })
           // generating token for the user Authentication..
           const token = await registerEmployee.generateAuthToken();
           // password hash using middleware
          const registered =  await registerEmployee.save();
          res.status(201).render("index"); // agr sahi ho gya sab kuch so status 201 and index mai chl jaao.
      }
    } catch(error)
    {
      res.status(400).send(error);
    }
})
app.get("/login" , (req, res) =>
{
//    res.send("Hello from the Manish");
      res.render("login");
})

// login verification
app.post("/login", async(req, res) =>{
  try{
     const email = req.body.email;
     const password = req.body.password;
     const user = await Register.findOne({email : email}); // returns a object (document)..
     const ismatch = await bcrypt.compare(password , user.password); // bcrypt match karega uska hashing code ko hamare abhi current password ko fill kiye ko.
     const token = await user.generateAuthToken();
     console.log('manish ' + token);

     if(ismatch)
     {
      res.status(201).render("index");
     }else {
      res.send("Invalid login details");
     }
  }catch(error){
      res.status(400).send("No user found");
  }
})
// const  securePassword = async (password) =>{
//   const passwordHash = await bcrypt.hash(password , 10); // 10 means the number of rounds as more number of rounds more will be security till 12 is there but more number of rounds so compilation will be slow.
//   
//   console.log(passwordmatch);
// }
// securePassword("manish");


// Authentication using jsonwebtoken..
// https://jwt.io/ refer jsonwebtoken website..
const jwt = require('jsonwebtoken');
const createToken = async() =>{
  // generate the token...
  // myselfmanishmamgainandbrothermayank security key which i made must be more than 32 length
  // expiresIn : "2 hours" means the token will expires after 2 hours so website bhul jayegi tumhe.
  const token = await jwt.sign({_id : "6525a8cd7f5eb2fa2dc78c49"} , "myselfmanishmamgainandbrothermayank", {
    expiresIn:"2 hours"
  });
  // console.log(token);
  const userVer = await jwt.verify(token , "myselfmanishmamgainandbrothermayank");
  console.log(userVer);
}
// createToken();

app.listen(port , () =>
{
    console.log(`server is  running at port no ${port}`);
});