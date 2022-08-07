const mongoose = require("mongoose");
// const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

// const User = mongoose.model('User', {
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validator(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!');
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validator(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password cannot contain "password"');
//             }
//         }
//     },
//     age: {
//         type: Number
//     }
// });