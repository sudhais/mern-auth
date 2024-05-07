import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { join } from 'path';
import cookieParser from 'cookie-parser';
import db from './config/db.js'
import user from './routes/userRoutes.js'


config();
const app = express();
app.use(cors());
app.use(express.json());  //it's allow to frontend inputs ex(postman, web browser) show backend in console log
app.use(cookieParser());

db();

//display the log of routes middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

app.use('/api/v1/user',user);

//error output middileware
app.use((err,req,res,next)=> {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode
  });
})

//error url middleware
app.use('*', (req,res)=>{
  res.status(404).json({message:'page not found'})
})

app.listen(process.env.PORT, () => {
  console.log(`server listening to the port : ${process.env.PORT}`);
})
