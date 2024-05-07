import userModel from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = (req, res,next) => {
  const { email, password } = req.body;

  userModel.findOne({email:email})
    .then((user) => {

      if (!user) {
        return next(errorHandler(404,'User not found'));       
      } 

      const validPassword = bcryptjs.compareSync(password,user.password);
      if (!validPassword) {
        // res.status(401).json('the password is incorrect')
        return next(errorHandler(401,'Invalid Credentials'));       
      } 
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //creating a token
      const {password:hashedPassword,...rest} = user._doc  //getting user data except password from rest
      const expiryDate = new Date(Date.now() + (1000 * 60 * 60)) //1 hour
      res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json({
        success:true,
        user:rest
      });
    })
    .catch((error) => {
      next(error);
    })

};

//Register 
export const registerUser = (req,res,next) =>{
  const {username, email, password} = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new userModel({username,email,password:hashedPassword});
  newUser.save()
    .then((savedUser) => {
      res.status(201).json({
        success:true,
        user:savedUser
      })

    })
    .catch((error) => {
      next(error);
    })
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {password:hashedPassword,...rest} = user._doc  //getting user data except password from rest
      const expiryDate = new Date(Date.now() + (1000 * 60 * 60)) //1 hour
      res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json({
        message:true,
        user:rest
      });
    }else{

      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword,10);

      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo
      });

      const user = await newUser.save();
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //creating a token
      const {password:hashedPassword2,...rest} = user._doc  //getting user data except password from rest
      const expiryDate = new Date(Date.now() + (1000 * 60 * 60)) //1 hour
      res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(201).json({
        success:true,
        user:user
      });
    }
    
  } catch (error) {
    next(error);
  }
}


export default {login, registerUser, google}