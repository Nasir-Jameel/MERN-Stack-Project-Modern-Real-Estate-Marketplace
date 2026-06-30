import express from "express"
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js"
import dotenv from "dotenv"

dotenv.config();
const app = express()

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log("Asal Error Yeh Hai:", err.message); // Yeh line error print karegi
  });



app.use("/api/user", userRouter)

app.listen(3000, ()=>{
    console.log("The server is running")
})
