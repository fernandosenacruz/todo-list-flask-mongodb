import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css';

const API = 'http://localhost:5000/';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const form = useRef();

  const getTodos = async () => {
    try {
      const { data } = await axios.get(API);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    try {
      await axios.post(API, {
        title,
        description,
        status,
      });

      form.reset();
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(API + `todo/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const update = (id) => {
    const task = todos.find((t) => t._id === id);
    setTodo(task);
    console.log(todo);
  };

  const updateTodo = async (id) => {
    console.log(id)
    try {
      await axios.put(API + `todo/${id}`);
      form.reset();
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="cards__todo">
        {todos &&
          todos?.map((todo) => (
            <div className="card__todo">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <span>{todo.status}</span>
              <div>
                <button type="button" onClick={() => update(todo._id)}>
                  update
                </button>
                <button type="button" onClick={() => deleteTodo(todo._id)}>
                  delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <form ref={form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="add task"
          required
          defaultValue={todo && todo.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className={styles.description}
          type="text"
          id="description"
          name="description"
          cols="20"
          rows="5"
          placeholder="add description"
          required
          defaultValue={todo && todo.description}
        />
        <div>
          <input type="radio" name="status" value="pending" required />
          pending
          <input type="radio" name="status" value="in progress" />
          in progress
          <input type="radio" name="status" value="done" />
          done
        </div>
        {todo._id ? (
          <button type="button" onClick={() => updateTodo(todo._id)}>
            update task
          </button>
        ) : (
          <button type="submit">create task</button>
        )}
      </form>
    </div>
  );
}

export default Todo;
