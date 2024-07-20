import React, { Suspense } from 'react'
import './styles/app.scss';
// since we are exporting default addTodoForm so we can choose any name so we are impoting it as Form
import Form from './addTodoForm';
import { cookies } from 'next/headers';

import Todos from './Todos';

const fetchTodo = async () => {
  try {
    const token = cookies().get('todo')?.value;
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: 'no-cache',
      headers : {
        'Content-Type' : 'application/json',
        'cookie' : `${token}`,
      },   
    });

    console.log('res of page.js ', res);
    console.log('token of page.js ', token);

    // const data = res;
    const data = await res.json();

    console.log('data of page.js ', data);

    if (!data.success) {
      console.log("hi i am in if");
      return [];
    }

    return data.tasks;
  } catch (error) {
    console.log('error of page.js ', error);
    return [];
  }
}

const page = async () => {
  // const tasks = data;
  // const tasks = await fetchTodo();
  // console.log('tasks of page.js ', tasks);

  return (
    <div className='container'>
      <Form />
      <Suspense fallback={<div>loading...</div>}>
      <Todos />
      </Suspense>
    </div>
  )
}

export default page
