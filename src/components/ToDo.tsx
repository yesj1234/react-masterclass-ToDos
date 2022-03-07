import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const Btn = styled.button`
  font-size: 100%;
`;

const ToDoText = styled.span`
  font-size: 150%;
`;

const BtnContainer = styled.div``;
const ToDoLi = styled.li`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDo] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDo((oldToDos) => {
      const targetPostition = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as any };
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
  useEffect(
    () => localStorage.setItem("toDos", JSON.stringify(toDos)),
    [toDos]
  );
  return (
    <>
      <ToDoLi>
        <ToDoText>{text}</ToDoText>
        <BtnContainer>
          {category !== Categories.Doing && (
            <Btn name={Categories.Doing} onClick={onClick}>
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
              Done
            </Btn>
          )}
          <Btn onClick={deleteToDo}>Delete</Btn>
        </BtnContainer>
      </ToDoLi>
    </>
  );
}
