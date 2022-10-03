import React from 'react';

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    };
    return <li className='list-group-item'>
        <div className="form-check form-switch">
            <input id={id} type="checkbox" className='form-check-input' checked={completed} onChange={handleTodoClick} />
                <label for={id} className={completed ? 'disabled' : ''}>{task}</label>
            {completed}
        </div>
    </li>;
}