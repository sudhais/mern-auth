import userModel from '../models/User.js';
import bcryptjs from 'bcryptjs';

export const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({email:email})
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(200).json({
            success:true,
            user
          })
        } else {
          res.status(401).json('the password is incorrect')
        }
      } else {
        res.status(401).json('No Record exists')
      }
    })
    .catch((error) => {
      res.status(500).json({
          message:'Internal Server Error',
          error: error.message
        })
    })

};

//Register 
export const registerUser = (req,res) =>{
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
      res.status(400).json({
        success:false,
        error:error.message
      })
    })
}


export default {login, registerUser}