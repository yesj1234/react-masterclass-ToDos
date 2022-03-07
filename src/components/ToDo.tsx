import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { ThemeConsumer } from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPerson,
  faPersonRunning,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
const Btn = styled.button`
  font-size: 100%;
`;

const ToDoLi = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6px;
  margin-left: 10px;
  input {
    color: red;
  }
`;
const ToDoText = styled.span`
  font-size: 150%;
  width: 70%;
`;

const BtnContainer = styled.div``;

interface IInputs {
  toDo: string;
}
export default function ToDo({ text, category, id, onedit }: IToDo) {
  const [toDos, setToDo] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDo((oldToDos) => {
      const targetPostition = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as any, onedit: false };
      return [
        ...oldToDos.slice(0, targetPostition),
        newToDo,
        ...oldToDos.slice(targetPostition + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDo((oldToDos) => {
      const targetPostition = oldToDos.findIndex((todo) => todo.id === id);
      return [
        ...oldToDos.slice(0, targetPostition),
        ...oldToDos.slice(targetPostition + 1),
      ];
    });
  };
  const editToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const curSpan =
      event.currentTarget.parentElement?.parentElement?.firstElementChild;
    curSpan?.setAttribute("contenteditable", "true");
    setToDo((oldToDos) => {
      const targetPostition = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: category as any, onedit: true };
      return [
        ...oldToDos.slice(0, targetPostition),
        newToDo,
        ...oldToDos.slice(targetPostition + 1),
      ];
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IInputs>();
  const saveEditToDo: SubmitHandler<IInputs> = (data) => {
    setToDo((oldToDos) => {
      const targetPostition = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = {
        text: data.toDo,
        id,
        category: category as any,
        onedit: false,
      };
      return [
        ...oldToDos.slice(0, targetPostition),
        newToDo,
        ...oldToDos.slice(targetPostition + 1),
      ];
    });
  };

  useEffect(
    () => localStorage.setItem("toDos", JSON.stringify(toDos)),
    [toDos]
  );
  return (
    <>
      <ToDoLi>
        {onedit ? (
          <form onSubmit={handleSubmit(saveEditToDo)}>
            <input
              type="text"
              style={{ backgroundColor: "transparent" }}
              placeholder={text}
              {...register("toDo", {
                required: { value: true, message: "Please Edit ToDo" },
              })}
            ></input>
          </form>
        ) : (
          <ToDoText>{text}</ToDoText>
        )}
        <BtnContainer>
          {category !== Categories.Doing && (
            <Btn name={Categories.Doing} onClick={onClick}>
              <FontAwesomeIcon icon={faPersonRunning} size="1x" />
              Doing
            </Btn>
          )}
          {category !== Categories.To_Do && (
            <Btn name={Categories.To_Do} onClick={onClick}>
              To Do
            </Btn>
          )}
          {category !== Categories.Done && (
            <Btn name={Categories.Done} onClick={onClick}>
              <FontAwesomeIcon icon={faPerson} size="1x" />
              Done
            </Btn>
          )}
          <Btn onClick={deleteToDo}>
            <FontAwesomeIcon icon={faTrashCan} size="1x" />
            Delete
          </Btn>
          <Btn onClick={editToDo}>
            <FontAwesomeIcon icon={faPen} size="1x" />
            Edit
          </Btn>
        </BtnContainer>
      </ToDoLi>
    </>
  );
}
