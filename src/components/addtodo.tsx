import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { eachTodoType, initalState } from "../types/types";

type AddtodoProps = {
  onAddTodo: (todoData: eachTodoType) => void;
  isEdit: eachTodoType | null;
  setEdit: Dispatch<SetStateAction<eachTodoType | null>>;
  HandleEditTodo: (eitem: eachTodoType) => void;
};

const AddToDo = ({
  onAddTodo,
  isEdit,
  setEdit,
  HandleEditTodo,
}: AddtodoProps) => {
  const [todo, setTodo] = useState<eachTodoType>(initalState);

  useEffect(() => {
    if (isEdit) {
      setTodo(isEdit);
    }
  }, [isEdit]);

  const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo({ ...todo, taskName: event.target.value });
  };

  const handleCalenderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTodo({ ...todo, deadLine: event.target.value });
  };

  const handleCancelEdit = () => {
    setEdit(null);
    setTodo(initalState);
  };

  return (
    <>
      <h3>Add new todo's</h3>
      <br />
      <input
        type={"text"}
        placeholder="Add a todo"
        value={todo.taskName}
        onChange={(e) => {
          handleInputValueChange(e);
        }}
        className="form-control mb-3"
      />

      <label>Add todo deadline calender</label>

      <input
        type={"date"}
        className="form-control mb-3"
        onChange={(e) => {
          handleCalenderChange(e);
        }}
        value={todo.deadLine}
      />

      <div className="d-flex gap-2">
        <button
          type="button"
          className={`btn ${isEdit ? "btn-warning" : "btn-primary"}`}
          onClick={(e) => {
            if (todo.taskName !== "" && todo.deadLine !== "") {
              if (isEdit) {
                HandleEditTodo({
                  ...isEdit,
                  taskName: todo.taskName,
                  deadLine: todo.deadLine,
                });
              } else {
                onAddTodo({ ...todo, todoListId: uuid() });
              }

              return setTodo(initalState);
            }

            alert("All fields are required!");
          }}
        >
          {isEdit ? "Edit Todo" : "Add a todo"}
        </button>

        {isEdit ? (
          <button
            className="btn btn-info"
            onClick={() => {
              handleCancelEdit();
            }}
          >
            Cancel Edit
          </button>
        ) : null}
      </div>
    </>
  );
};

export default AddToDo;
