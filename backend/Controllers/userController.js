import userModel from '../models/User.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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


export default {login, registerUser}