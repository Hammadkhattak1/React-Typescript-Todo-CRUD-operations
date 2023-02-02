import React from "react";
import { eachTodoType } from "../types/types";
type ViewTodoProps = {
  
  viewToDos: eachTodoType[];
  deletetodo: (todoitem: eachTodoType) => void;

  EditTodoItem: (todoItem: eachTodoType) => void;

  ChangeTodoStatus: (changedItem: eachTodoType) => void;


  // create a new  function to clear all to dos


};

const ViewTodos = (props: ViewTodoProps) => {


  const editTodo = (
    event: React.MouseEvent,
    editedElement: eachTodoType

  ): void => {
    props.EditTodoItem(editedElement);
  };





  return (
    <>
      <div className="mt-3">
        <h4>View All Todo's</h4>

        <ol className="list-group list-group-numbered">
          {props.viewToDos && props.viewToDos.length > 0 ? (
            props.viewToDos.map((eachTodo: eachTodoType) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={eachTodo.todoListId}
                >
                  <div className="ms-2 me-auto">
                    <div
                      className={` display-6 fs-4  ${
                        eachTodo.isCompleted
                          ? "text-decoration-line-through"
                          : ""
                      } `}
                    >
                      {eachTodo.taskName}
                    </div>

                    <strong className="display-6 fs-5">Dead Line :</strong>
                    <span className="text-danger bg-dark p-1 mt-2 d-inline-block fw-bold">
                      {" "}
                      {eachTodo.deadLine}
                    </span>

                    <div className=" mt-3">
                      <span
                        className={`badge  ${
                          eachTodo.isCompleted ? "bg-success text-light " : "bg-warning text-dark"
                        }`}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          props.ChangeTodoStatus(eachTodo);
                        }}
                      >
                        {eachTodo.isCompleted ? "Completed" : "Remaining"}
                      </span>
                    </div>
                  </div>

                  <span className="badge bg-primary   rounded-pill">
                    <i
                      className="bi bi-pencil-square fs-6"
                      onClick={(event) => {
                        editTodo(event, eachTodo);
                      }}
                    ></i>
                  </span>
                  <span className="badge bg-danger ms-2   rounded-pill">
                    <i
                      className="bi bi-trash  fs-6"
                      onClick={() => {
                        props.deletetodo(eachTodo);
                      }}
                    ></i>
                  </span>
                </li>
              );
            })
          ) : (
            <strong className="text-danger">No todo's has been added</strong>
          )}
        </ol>
      </div>
    </>
  );
};

export default ViewTodos;
