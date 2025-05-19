/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isLoading?: boolean;
  onDelete?: (todoId: Todo['id']) => void;
  onToggle?: (todoId: Todo['id'], completed: boolean) => void;
  isProcessing?: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading = false,
  onDelete,
  onToggle,
  isProcessing = false,
}) => {
  const { id, title, completed } = todo;
  const isBusy = isLoading || isProcessing;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle?.(id, e.target.checked);
  };

  const handleDeleteClick = () => {
    onDelete?.(id);
  };

  const todoClasses = classNames('todo', {
    completed,
    'is-processing': isProcessing,
  });

  return (
    <div data-cy="Todo" className={todoClasses}>
      <label className="todo__status-label" htmlFor={`status-${id}`}>
        <input
          id={`status-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleToggle}
          disabled={isBusy}
          aria-label={`Mark todo "${title}" as ${completed ? 'active' : 'completed'}`}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        aria-label={title}
      >
        {title}
      </span>

      {onDelete && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDeleteClick}
          disabled={isBusy}
          aria-label={`Delete todo "${title}"`}
        >
          ×
        </button>
      )}

      {isBusy && (
        <div
          data-cy="TodoLoader"
          className={classNames('modal overlay', { 'is-active': isBusy })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};