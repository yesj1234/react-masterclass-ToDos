import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface CardProps {
  isDragging: boolean;
}

const Card = styled.div<CardProps>`
  margin-bottom: 8px;
  border-radius: 20px;
  padding: 5px 20px;
  background-color: ${(props) =>
    props.isDragging ? "#0984e3" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableCardProps {
  toDoText: string;
  toDoId: number;
  index: number;
}
export default React.memo(function DraggableCard({
  toDoText,
  toDoId,
  index,
}: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
});
