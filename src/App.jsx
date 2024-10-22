import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };
  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };
  const remainingTodos = todos.filter(todo => !todo.completed).length;
  return (
    <div>
      <h1>Список справ</h1>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Введіть нову справу" />
      <button onClick={addTodo}>Додати</button>
      <h2>Всього справ: {todos.length}</h2>
      <h2>Незроблених справ: {remainingTodos}</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} onClick={() => toggleComplete(index)}>
            {todo.completed ? <strike>{todo.text}</strike> : todo.text}
          </li>))}</ul>
    </div>
  );
}
export default App;