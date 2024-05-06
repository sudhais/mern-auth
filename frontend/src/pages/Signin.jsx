import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Signin() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch(signInStart());
    // axios
    //   .post('http://localhost:8000/api/v1/user/login', formData)
    //   .then((response) => {
    //     const data = response.data
    //     console.log(data);
    //     dispatch(signInSuccess(data));
    //     if(!data.success){
    //       dispatch(signInFailure());
    //       return;
    //     }
    //     navigate('/');
    //   })
    //   .catch((error) => {
    //     dispatch(signInFailure(error));
    //     console.log(error);
    //   })

    try{
      dispatch(signInStart());
      const res = await fetch('api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(!data.success){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
    }catch(error) {
      dispatch(signInFailure(error));
    }

  }

  // console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {loading ? 'Loading...': 'Sign In'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || 'something went wrong' : ''}</p>
    </div>
  )
}
