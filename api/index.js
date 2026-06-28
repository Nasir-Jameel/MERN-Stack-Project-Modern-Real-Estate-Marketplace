const express = require("express")
const mongoose = require('mongoose');

require("dotenv").config();


mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log("Asal Error Yeh Hai:", err.message); // Yeh line error print karegi
  });


const app = express();

app.listen(3000, ()=>{
    console.log("The server is running")
})
