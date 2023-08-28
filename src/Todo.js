import React, { useEffect, useState } from "react";
import "./Todo.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [isDeleteEnabled,setIsDeleteEnabled]=useState(true);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function handleInputChange(e) {
    if (e.target.value.trim() !== "") {
      setTodo(e.target.value);
    }
  }
  function handleFormSubmission(e) {
    e.preventDefault();
    if (todo !== null) {
      setTodos([
        ...todos,

        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
      setTodo("");
    }
  }
  function handleDeleteButton(id) {
    if(currentTodo.id!==id){
    const removeTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeTodo);
  }
  }

  function handleEditButton(todo) {
    setIsEditing(true);
    setIsDeleteEnabled(false);
    setCurrentTodo({ ...todo });
  }

  function updateTodoItem(id, updatedItem) {
    const updatedTodo = todos.map((todo) => {
      return todo.id === id ? updatedItem : todo;
    });
    setIsEditing(false);
    setTodos(updatedTodo);
    setIsDeleteEnabled(true);
  }

  function handleEditFormSubmission(e) {
    e.preventDefault();
    updateTodoItem(currentTodo.id, currentTodo);
    setCurrentTodo("");
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }
  return (
    <>
    <h1 style={{textAlign:"center", border:"2px solid pink", backgroundColor:"greenyellow"}}>To-do Application</h1>
      {isEditing ? (
        <div className="formClass">
        <form onSubmit={handleEditFormSubmission}>
          <input
            type="text"
            placeholder="Edit here:"
            value={currentTodo.text}
            onChange={handleEditInputChange}
            required
          />
          <Button type="submit" className="todoButton">Update</Button>
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
            className="todoButton"
          >
            cancel
          </Button>
        </form>
        </div>
      ) : (
        <div className="formClass">
        <form onSubmit={handleFormSubmission}>
          <input
            type="text"
            placeholder="Enter your todo here"
            onChange={handleInputChange}
            value={todo}
            required
          />
          <Button type="submit" className="todoButton">Add</Button>
        </form>
        </div>
      )}
      <div className="list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
           <span style={{width:"700px",overflow:"hidden",
  textOverflow: "ellipsis"}}>{todo.text}</span> 
            <ButtonGroup aria-label="Basic example">
            <Button onClick={() => handleEditButton(todo)}  variant="primary" className="todosButton">Edit</Button>
            <Button onClick={() => handleDeleteButton(todo.id)}  variant="primary" className="todosButton" disabled={currentTodo.id===todo.id && !isDeleteEnabled}>Delete</Button>
            </ButtonGroup>
          </li>
        ))}          
      </ul> 
      </div>
    </>
  );
};

export default Todo;
