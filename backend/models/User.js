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
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw0bj25EzQW9wIFLxv66dtUN&ust=1715125470755000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNi6w8ya-oUDFQAAAAAdAAAAABAE",
  },
}, {timestamps:true})  // automatically create the created time and end time when using timestamps true

const User = mongoose.model('User', userSchema)

export default User
