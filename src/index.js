const express=require("express");

const app=express();
const path=require("path");

const hbs=require("hbs");

const collection=require("./mongodb");
const { Collection } = require("mongoose");

const Guest=require("./gmongodb");
const { guest }= require("mongoose");



const templatePath=path.join(__dirname,'../templates');
let x;

app.use(express.json());


app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.urlencoded({extends:false}));


app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/signup",(req,res)=>{

    res.render("signup");
});
app.get("/login.hbs",(req,res)=>{
    res.render("login");
});

app.get("/complaintstrial.hbs",(req,res)=>{
    res.render("complaintstrial");
});
app.get("/poll.hbs",(req,res)=>{
    res.render("poll");
});
app.get("/about.hbs",(req,res)=>
    {
    res.render("about");
    });
app.get("/faq.hbs",(req,res)=>{
    res.render("faq");
});
app.get("/contact.hbs",(req,res)=>{
    res.render("contact")
});
app.get("/guestsloginput.hbs",(req,res)=>{
    res.render("guestsloginput");
});
app.post('/guestsloginput', (req, res) => {
    const { guestName, contactNumber, doorNumber, hostName, date, time } = req.body;
    const newGuest = new Guest({ guestName, contactNumber, doorNumber, hostName, date, time });
    newGuest.save()
        .then(() => res.status(201).json({ message: 'Guest added successfully' }))
        .catch(err => res.status(500).json({ message: err.message }));
      
});



app.listen(10000,()=>{
    console.log("port connected");
});

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data]);

    res.render("login");
});
app.post("/login",async (req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name});
        x=req.body.password;
        if (check.password===req.body.password)
            {
                res.render("dashboard");
            }
        else{
               res.send("incorrect password")
        }

    }
    catch{
      res.send("Wrong Credentials");
    }
    
      
});
let pswd="security";
   app.get("/gueststable.hbs", async (req, res) => {
    try {
        if(x===pswd){
        const guests = await Guest.find();
        
        res.render("gueststable", { guests }); 
        }
        else{
       res.send("You dont have the authority");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }    
}
);