import { useEffect, useState } from "react";
import AddToDo from "../components/addtodo";
import ViewTodos from "../components/viewtodos";

import { allTodo, eachTodoType } from "../types/types";

const Todo = () => {
  // defining state with types as string of array or null with initial state as null
  const [todoList, setTodoList] = useState<allTodo | []>([]);
  const [isEditable, setEditable] = useState<eachTodoType | null>(null);

  useEffect(() => {
    const stringifieldValues: string | null = localStorage.getItem("todos");

    if (stringifieldValues) {
      const parsedValues: allTodo | [] = JSON.parse(stringifieldValues);
      setTodoList(parsedValues ? parsedValues : []);
    }
  }, []);

  const handleAddToDo = (todo: eachTodoType): void => {
    setTodoList([...todoList, todo]);

    localStorage.setItem("todos", JSON.stringify([...todoList, todo]));
  };

  const deletedtodoItem = (delItem: eachTodoType) => {
    let newtodos: allTodo = todoList.filter(
      (eachtodoitem) => eachtodoitem.todoListId !== delItem.todoListId
    );
    setTodoList(newtodos);

    localStorage.setItem("todos", JSON.stringify(newtodos));
  };

  const EditToDoItem = (editedItem: eachTodoType) => {
    const foundEditedItem: eachTodoType | undefined = todoList.find(
      (todo) => todo.todoListId === editedItem.todoListId
    );

    if (foundEditedItem) {
      setEditable(foundEditedItem);
    }
  };

  const handleEditTodoItem = (eItem: eachTodoType) => {
    let isItemAvailable: Boolean = false;
    let copiedList: allTodo | [] = [...todoList];
    for (let index = 0; index < copiedList.length; index++) {
      if (copiedList[index].todoListId === eItem.todoListId) {
        isItemAvailable = true;
        copiedList[index] = eItem;
        break;
      }
    }
    if (isItemAvailable) {
      localStorage.setItem("todos", JSON.stringify(copiedList));
      setTodoList(copiedList);
      setEditable(null);
    }
  };

  const changetodoStatus = (item: eachTodoType) => {
    let isItemAvailable: Boolean = false;
    let copiedList: allTodo | [] = [...todoList];
    for (let index = 0; index < copiedList.length; index++) {
      if (copiedList[index].todoListId === item.todoListId) {
        isItemAvailable = true;
        copiedList[index].isCompleted = !copiedList[index].isCompleted;
        break;
      }
    }
    if (isItemAvailable) {
      localStorage.setItem("todos", JSON.stringify(copiedList));
      setTodoList(copiedList);
      setEditable(null);
    }
  };

  return (
    <>
      <div className="row justify-content-center align-items-center gap-3 mt-5">
        <div className="col-md-4">
          <AddToDo
            onAddTodo={(newtodo) => {
              handleAddToDo(newtodo);
            }}
            isEdit={isEditable}
            setEdit={setEditable}
            HandleEditTodo={handleEditTodoItem}
          />
          <ViewTodos
            viewToDos={todoList}
            deletetodo={deletedtodoItem}
            EditTodoItem={EditToDoItem}
            ChangeTodoStatus={changetodoStatus}
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
