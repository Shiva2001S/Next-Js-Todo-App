import React from 'react'
import jwt from 'jsonwebtoken'
import { User } from './models/user';
import { Task } from './models/task';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TodoItem } from './components/ServerComponent';

const Todos = async() => {
    const token = cookies().get('todo')?.value;
    if (!token) return redirect('/login');

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    const tasks = await Task.find({ user: user._id });

    return (
        <div>
            <section className='todosContainer'>
                {
                    tasks?.map((i) => (
                        <TodoItem
                            title={i.title}
                            description={i.description}
                            id={i._id}
                            key={i._id}
                            completed={i.isCompleted} />
                    ))
                }
            </section>
        </div>
    )
}

export default Todos
