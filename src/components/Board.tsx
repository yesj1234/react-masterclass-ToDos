import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import { toDoState, IToDo } from "../atoms";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
  min-height: 200px;
  padding-top: 30px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: black;
  font-weight: 600;
  position: absolute;
  top: 0;
  left: 40%;
  transform: translate(0, 25%);
`;
interface AreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<AreaProps>`
  padding: 3px 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    /* padding-right: 10px; */
    width: 90%;
  }
`;
interface IForm {
  ToDo: string;
}
export default function Board({ toDos, boardId }: IBoardProps) {
  const [toDo, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onSubmit = ({ ToDo }: IForm) => {
    const newObj = { text: ToDo, id: Date.now() };
    localStorage.setItem(
      "toDos",
      JSON.stringify({ ...toDo, [boardId]: [newObj, ...toDo[boardId]] })
    );
    setToDos((current) => {
      return { ...current, [boardId]: [newObj, ...current[boardId]] };
    });
    setValue("ToDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("ToDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
