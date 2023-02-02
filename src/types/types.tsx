type allTodo = {
  taskName: string;
  deadLine: string;
  todoListId: string;
  isCompleted: boolean;
}[];

type eachTodoType = {
  taskName: string;
  deadLine: string;
  todoListId: string;
  isCompleted: boolean;
};

const initalState = {
  taskName: "",
  deadLine: "",
  todoListId: "",
  isCompleted: false,
};

export type { allTodo, eachTodoType };

export { initalState };
