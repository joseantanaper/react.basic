import React, { Fragment, useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoList } from './components/TodoList';

const KEY = 'todoApp.todos';

export function App() {

    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea 1', completed: false}
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    const handleTodoAdd = (event) => {
        if(event.key !== undefined && event.key !== 'Enter') return;
        const task = todoTaskRef.current.value;
        if (task === '') return;
        setTodos( (prevTodos) => {
            return [...prevTodos, {id: uuid(), task, completed: false}]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearCompleted = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const handleClearAll = () => {
        const newTodos = [];
        setTodos(newTodos);
    };

    return (
        <Fragment>
            <h1>Persistent Task Scheduler with React/Bootstrap</h1>
            <hr />
            <div className='input-group mb-3'>
                <input
                    className="form-control"
                    ref={todoTaskRef}
                    type="text"
                    onKeyDown={handleTodoAdd}
                    placeholder='Nueva tarea'
                />
                <button
                    className="btn btn-outline-primary"
                    onClick={handleTodoAdd}
                >+</button>
                <button
                    className="btn btn-outline-dark"
                    onClick={handleClearCompleted}
                    title="Eliminar tareas completadas"
                >
                    - {todos.filter((todo) => todo.completed).length ? '(' + todos.filter((todo) => todo.completed).length + ')' : ''}
                </button>
                <button
                    className="btn btn-outline btn-danger"
                    onClick={handleClearAll}
                >
                    ! {todos.length ? '(' + todos.length + ')' : ''}
                </button>
            </div>

            <hr />
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <hr />
            <div>
                {todos.length} tareas /
                &nbsp;{todos.filter((todo) => !todo.completed).length} pendientes /
                &nbsp;{todos.filter((todo) => todo.completed).length} completadas
            </div>
        </Fragment>
    );
}