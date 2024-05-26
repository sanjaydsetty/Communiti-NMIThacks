// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import path module for setting views directory
const hbs = require('hbs'); // Import Handlebars

// Initialize Express app
const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/guestsDB');
const db = mongoose.connection;

// Define Guest schema
const guestSchema = new mongoose.Schema({
    guestName: String,
    contactNumber: String,
    doorNumber: String,
    hostName: String,
    date: String,
    time: String
});

// Create Guest model
const Guest = mongoose.model('Guest', guestSchema);

// Set HBS as the view engine and set views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Endpoint to render the form
app.get("/guestsloginput.hbs",(req,res)=>{
    res.render("guestsloginput");
});

// Endpoint to handle form submission
app.post('/guestsloginput', (req, res) => {
    const { guestName, contactNumber, doorNumber, hostName, date, time } = req.body;
    const newGuest = new Guest({ guestName, contactNumber, doorNumber, hostName, date, time });
    newGuest.save()
        .then(() => res.status(201).json({ message: 'Guest added successfully' }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// Start the server
const port = 12000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
