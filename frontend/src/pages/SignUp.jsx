import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    axios
      .post('http://localhost:8000/api/v1/user/register', formData)
      .then((response) => {
        console.log(response.data);
        setError(false);
        setLoading(false);
        navigate('/sign-in');
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      })

    // try{
    //   setLoading(true);
    //   const res = await fetch('api/v1/user/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   setLoading(false);
    //   if(!data.success){
    //     setError(true);
    //     return;
    //   }
    // }catch(error) {
    //   setError(true);
    //   setLoading(false);
    // }

  }

  // console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type='text' 
          placeholder='User Name' 
          id='username' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChanges}/>

        <input 
          type='text' 
          placeholder='Email' 
          id='email' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChanges}/>

        <input 
          type='password' 
          placeholder='Password' 
          id='password' 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChanges}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...': 'Sign Up'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
    </div>
  )
}
