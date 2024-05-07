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
  },
  profilePicture: {
    type: String,
    default: "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=2048x2048&w=is&k=20&c=-g-2McKwLpsyYHPDT3Wf1oo2ppTmNxq797heiFJmwSM=",
  },
}, {timestamps:true})  // automatically create the created time and end time when using timestamps true

const User = mongoose.model('User', userSchema)

export default User
