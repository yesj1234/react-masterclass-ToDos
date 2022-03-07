import styled from "styled-components";
import { CreateToDo } from "./CreateToDo";
import ToDoListFilter from "./ToDoListFilter";
const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: 100vh;
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
