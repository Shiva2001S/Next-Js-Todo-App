'use client';
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Context } from '../components/Clients';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    if (user && user._id) {
      console.log('hello ji');
      redirect('/');
    }
  }, [user]);


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          name, 
          email, 
          password,
        })
      });
      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      console.log(data);
      setUser(data.user);
      toast.success(data.message);

      // if(data.success) redirect('/login');
    } catch (error) {
      return toast.error(error.message);
    }
  }
  return (
    <div className='login'>
      <section>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder='Enter name' onChange={(e) => setName(e.target.value)} value={name} />
          <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
          <button type="submit">Sign Up</button>

          <p>OR</p>
          <Link href={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
};



export default Page;
