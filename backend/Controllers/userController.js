import userModel from '../models/User.js'

export const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({email:email})
    .then((user) => {
      if (user) {
        if (user.password === password) {
          return res.status(200).json({
            success:true,
            user
          })
        } else {
          return res.status(401).json('the password is incorrect')
        }
      } else {
        return res.status(401).json('No Record exists')
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
  const newUser = new userModel(req.body);
  newUser.save()
    .then((savedUser) => {
      return res.status(201).json({
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