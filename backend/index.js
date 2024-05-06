import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { join } from 'path';
import db from './config/db.js'
import user from './routes/userRoutes.js'

config({path:join('./config/config.env')});

const app = express();
app.use(cors());
app.use(express.json());

db();

//display the log of routes middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

app.use('/api/v1/user',user);

//error url middleware
app.use('*', (req,res)=>{
  res.status(404).json({message:'page not found'})
})

app.listen(process.env.PORT, () => {
  console.log(`server listening to the port : ${process.env.PORT}`);
})
