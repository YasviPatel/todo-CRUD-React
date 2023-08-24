import React, { useEffect, useState } from "react";
import "./Todo.css";

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
    const removeTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeTodo);
  }

  function handleEditButton(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
    console.log("currentTodo", currentTodo);
  }

  function updateTodoItem(id, updatedItem) {
    const updatedTodo = todos.map((todo) => {
      return todo.id === id ? updatedItem : todo;
    });
    setIsEditing(false);
    setTodos(updatedTodo);
  }

  function handleEditFormSubmission(e) {
    e.preventDefault();
    updateTodoItem(currentTodo.id, currentTodo);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }
  return (
    <>
    <h1 style={{textAlign:"center"}}>To-do Application</h1>
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
          <button type="submit" className="todoButton">Update</button>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className="todoButton"
          >
            cancel
          </button>
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
          <button type="submit" className="todoButton">Add</button>
        </form>
        </div>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditButton(todo)} className="todosButton">Edit</button>
            <button onClick={() => handleDeleteButton(todo.id)} className="todosButton">Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
