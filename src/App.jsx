import "./App.css";
import { useState, useEffect, useRef } from "react";
import TodoCard from "./TodoCard";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import { Input } from "@/components/ui/input"


function App() {
   
  const  [todoState,setTodoState] = useState(() => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
});

  let nextId = useRef(1)

  const [inputState,setInputState] = useState("");


  function AddTodo(){
    if (inputState.trim() === "") return;
    const newTodo = {
      id: nextId.current,
      title: inputState,
      state: "Waiting"
    };
    nextId.current++;
    const updateTodos = [...todoState,newTodo]
    setTodoState(updateTodos)
    setInputState("")
    
  }


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  }, [todoState]);


  function removeItem(id) {
    const updatedTodos = todoState.filter((t) => t.id !== id);
    setTodoState(updatedTodos); 
  }
  function updateItem(id, updateTitle) {
    const updatedTodos = todoState.map((t) =>
      t.id === id ? { ...t, title: updateTitle } : t
    );
    setTodoState(updatedTodos);
  }


  return (
    <div className="w-full bg-background flex items-center justify-center ">
      <Card className="w-full max-w-sm bg-secondary mt-40">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-3xl">My Todo</CardTitle>
        </CardHeader>

        <CardContent>
          <TodoCard todos = {todoState} removeItem={removeItem} updateItem={updateItem} />
        </CardContent>

        <CardFooter>
          <Button variant='outline' className={'w-fit m-2'} onClick={AddTodo}>
            <CirclePlus className="size-6"/>
          </Button>
          <Input className={"text-2xl"} value={inputState} onChange={(e)=>{
            setInputState(e.target.value)
          }}/>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
