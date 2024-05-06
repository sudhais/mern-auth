import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'user name cannot be null'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email cannot be null'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password cannot be null'],
    trim: true,
  }
}, {timestamps:true})  // automatically create the created time and end time when using timestamps true

const User = mongoose.model('User', userSchema)

export default User
