import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { ImPencil2 } from 'react-icons/im';
import { MdOutlinePostAdd } from 'react-icons/md';
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

  const updateTodo = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    try {
      await axios.put(API + `todo/${id}`, {
        title,
        description,
        status,
      });

      setTodo({});
      form.reset();
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.cards__todo}>
        {todos &&
          todos?.map((todo) => (
            <div className={styles.card__todo}>
              <h5>{todo.title}</h5>
              <p>{todo.description}</p>
              <span>{todo.status}</span>
              <div className={styles.container__btn}>
                <button
                  className={styles.btn_update}
                  type="button"
                  onClick={() => update(todo._id)}
                >
                  <ImPencil2 />
                </button>
                <button
                  className={styles.btn_delete}
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
      </div>
      <form
        className={styles.form}
        ref={form}
        onSubmit={(e) => {
          if (todo._id) {
            updateTodo(e, todo._id);
          } else {
            handleSubmit(e);
          }
        }}
      >
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
        <div className={styles.radio__btn}>
          <input type="radio" name="status" value="pending" required />
          pending
          <input type="radio" name="status" value="in progress" />
          in progress
          <input type="radio" name="status" value="done" />
          done
        </div>
        {todo._id ? (
          <button className={styles.btn_update} type="submit">
            update task
          </button>
        ) : (
          <button className={styles.btn_submit} type="submit">
            <MdOutlinePostAdd />
          </button>
        )}
      </form>
    </div>
  );
}

export default Todo;
