import { atom, selector } from "recoil";

export enum Categories {
  "To_Do" = "To_Do",
  "Doing" = "Doing",
  "Done" = "Done",
}
export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") as any) || [],
});

export const categoryState = atom<Categories>({
  key: "categoryState",
  default: Categories.To_Do,
});

export const filteredToDoListState = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
