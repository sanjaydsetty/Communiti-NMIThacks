const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/guestsDB')
.then(()=>{
    console.log("gmongodb connected");
})
.catch(()=>{
    console.log("gmongodb failed to connect");
});
const db = mongoose.connection;

const guestSchema = new mongoose.Schema({
    guestName: String,
    contactNumber: String,
    doorNumber: String,
    hostName: String,
    date: String,
    time: String
});

const Guest = new mongoose.model("guest1", guestSchema);
module.exports=Guest;
