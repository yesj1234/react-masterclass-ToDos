import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";
interface IInputs {
  toDo: string;
}

export function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const curCategory = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: data.toDo, id: Date.now(), category: curCategory },
    ]);
    setValue("toDo", "");
  };
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <>
      <div>
        <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("toDo", {
              required: { value: true, message: "Please Write ToDo" },
            })}
          ></input>
          <button>Add</button>
        </form>
      </div>
      <div>
        <ErrorMessage
          errors={errors}
          name="toDo"
          render={({ message }) => <p>{message}</p>}
        />
      </div>
    </>
  );
}
