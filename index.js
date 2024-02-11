const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs")
const mongoose = require('mongoose')


const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/signdb',{useNewUrlParser: true}); 

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine','ejs')
app.use(express.static("public"))

const Signup = mongoose.model('Signup' , {
    username: String,
    email : String,
    password : String
})

app.get('/' , function(req,res){
    
    res.render("sign")
})

app.post('/' , function(req,res){
    var user_name = req.body.user;
    var e_mail = req.body.email;
    var pass_word = req.body.password;
    
    const user = new Signup({
           username : user_name,
           email : e_mail,
           password  : pass_word
    })
     user.save();

     res.redirect("/")
})

app.listen(3000 , function(req,res){
    console.log("Server Started On 3000");

})