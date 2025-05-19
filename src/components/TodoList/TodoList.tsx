// TodoList.tsx

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  todosDeleting: Todo['id'][]; // IDs das tarefas sendo deletadas
  handleDeleteTodo: (todoId: Todo['id']) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  todosDeleting,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isLoading={todosDeleting.includes(todo.id)}
            handleDelete={handleDeleteTodo}
          />
        ))
      ) : (
        <p className="todoapp__empty">Nenhuma tarefa encontrada.</p>
      )}
    </section>
  );
};
