import React, { useState,useEffect  } from 'react';
import './App.css'


const getitem=()=>{
  const list=localStorage.getItem('todos');
  if(list){
    return JSON.parse(localStorage.getItem('todos'));
  }else{
    return [];
  }
}
function App() {
  const [todos, setTodos] = useState(getitem());
  const [newTodo, setNewTodo] = useState('');

//adding the new TODO list
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([{ text: newTodo, completed: false },...todos]);
      localStorage.setItem('todos', JSON.stringify(todos));
      setNewTodo('');
    }
  };

  //Marking the todo complete and moving them down
  const markComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    const completedTodos = updatedTodos.filter((todo) => todo.completed);
    const activeTodos = updatedTodos.filter((todo) => !todo.completed);
    setTodos([...activeTodos, ...completedTodos]);
  };

  //deleting a todo from list
  const deletetodo = (index) => {
    const updatedTodos = [...todos];
    const notremovedtodos = updatedTodos.filter((todo, i) => i !== index);
    setTodos(notremovedtodos);
  };
  
//reseting the todo list
  const resetApp = () => {
    setTodos([]);
  };
 

  //storing data on local storage
  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <div className='main'>
      <div className='header'>
      <h1>TODO APP</h1><hr/>
      <button onClick={resetApp}>Reset</button> 
      </div>
    <div className='submain'>
  
      <div className='input'>
     <input
        type="text"
        placeholder="Add a new TODO"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />
      <button onClick={addTodo}>Add</button>
    </div>

      <div className='list'>
        {todos.map((todo, index) => (
          <div
            key={index}
          >
            <ul>
            <li>
              <p className={todo.completed ? 'completed' : ''}   onClick={() => markComplete(index)}>
              {todo.text}
              </p>
           <img src='https://cdn-icons-png.flaticon.com/128/1828/1828843.png' alt='delete' onClick={()=>deletetodo(index)}/>
            </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
        
    </div>
  );
}

export default App;