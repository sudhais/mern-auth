import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {app} from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);

  useEffect(()=>{

    if(image) {
      handleFileUpload(image);
    }

  },[image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => setFormData({...formData, profilePicture:downloadURL})
          )
      }
    )


  }

  
  const handleChanges = () => {

  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center'>
        Profile
      </h1>
      <form action="" className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileRef} 
          onChange={(e)=> setImage(e.target.files[0])}
          hidden 
          accept="image/*"/>

        <img 
          src={formData.profilePicture || currentUser.user.profilePicture} 
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}/>

          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">Error Uploading Image (file size must be less than 2MB)</span>
            ): imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-red-700">{`Uploading: ${imagePercent} %`}</span>) :imagePercent === 100 ? (
                <span className="text-green-700">Image Uploaded Succesfully</span>
              ):""
            }
          </p>

          <input 
            type='text' 
            placeholder='Username' 
            defaultValue={currentUser.user.username}
            id='username' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChanges}/>
          
          <input 
            type='text' 
            placeholder='Email' 
            defaultValue={currentUser.user.email}
            id='email' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChanges}/>

          <input 
            type='text' 
            placeholder='password' 
            id='password' 
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChanges}/>
            
          <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
