'use client';
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Context } from '../components/Clients.jsx';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import '../styles/app.scss';
const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useContext(Context);
  const a = useContext(Context);
  console.log('a ', a);

  useEffect(() => {
    if (user && user._id) {
      redirect('/');
    }
  }, [user]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login',{
        method : 'Post',
        body : JSON.stringify({
          email, password
        }),
        headers : {
          'Content-Type' : 'application/json',
        }, 
      })
      const data = await res.json();
      console.log('data ', data);
      if(!data.success){
        console.log('inside error');
        return toast.error(data.message);
      }
      setUser(data.user);
      console.log('login user ', user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  return (
    <div className='login'>
      <section>
        <form onSubmit={loginHandler}>
            <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type="submit">Login</button>

            <p>OR</p>
            <Link href={'/register'}>New User</Link>
        </form>
      </section>
    </div>
  )
};

export default Page;


