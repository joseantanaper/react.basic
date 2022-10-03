import React from 'react';
import { TodoItem } from './TodoItem';

export function TodoList({ todos, toggleTodo }) {
    return (
        <ul>
            {todos.map((todo) => (
                <ul className='list-group'>
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                </ul>
            ))}
        </ul>
    );
}