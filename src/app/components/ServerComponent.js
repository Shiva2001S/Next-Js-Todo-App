import React from 'react'
import { TodoButton } from './NewTask'

export const TodoItem = ({id, title, description, completed}) => {
  return (
    <div className='todo'>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div>
        <TodoButton id={id} completed={completed} />
      </div>
    </div>
  )
}

