import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const handleChanges = () => {

  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center'>
        Profile
      </h1>
      <form action="" className="flex flex-col gap-4">
        <img 
          src={currentUser.user.profilePicture} 
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>

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
