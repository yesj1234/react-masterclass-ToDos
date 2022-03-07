import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, filteredToDoListState } from "../atoms";
import ToDo from "./ToDo";

const ToDosUl = styled.ul`
  width: 100%;
`;

export default function ToDoListFilter() {
  const toDos = useRecoilValue(filteredToDoListState);
  const [category, setCategory] = useRecoilState(categoryState);
  const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <>
      Filter:
      <select
        style={{ width: "20%" }}
        value={category}
        onChange={updateCategory}
      >
        <option value="To_Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
      <ToDosUl>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ToDosUl>
    </>
  );
}
