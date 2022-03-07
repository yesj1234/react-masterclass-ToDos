import styled from "styled-components";
import { CreateToDo } from "./CreateToDo";
import ToDoListFilter from "./ToDoListFilter";
const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
function ToDoList() {
  return (
    <>
      <Container>
        <CreateToDo />
        <ToDoListFilter></ToDoListFilter>
      </Container>
    </>
  );
}

export default ToDoList;
