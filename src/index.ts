import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection failed:', err));

app.get('/',(req,res)=>{
    res.send('CampusEats RUNS');
});

app.listen(PORT, () =>{
    console.log(`the server is running on : ${PORT}`);
});