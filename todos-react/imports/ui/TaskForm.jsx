import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

export const TaskForm = ({ userId }) => {
  const [text, setText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!text) {
      return alert('Text should not be empty')
    }

    TasksCollection.insert({ text, userId, createdAt: new Date() });
    setText('');
  };

  return (
    <form className='task-form'>
      <input 
        type='text' 
        placeholder='Type to add new task'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='button' onClick={addTask}>Add task</button>
    </form>
  );
};
