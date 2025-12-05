import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';



const app=express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send('Api Working'));

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
});


