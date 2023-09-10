const mongoose = require("mongoose");
// connect method return a promise  so we have to use two things then function (promise fulfilled) and error handle(promise rejected) 
mongoose.connect("mongodb://127.0.0.1:27017/jnvMembers").then(() =>
{
    console.log(`connection successful`);
}).catch((e) =>
{
    console.log("no connection");
})