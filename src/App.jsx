import "./App.css";
import { useState, useEffect, useMemo } from "react";
import TodoCard from "./TodoCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function addTodo() {
    if (input.trim() === "") return;

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo = {
      id: newId,
      title: input,
      state: "Pending",
    };

    setTodos([...todos, newTodo]);
    setInput("");
    toast("the item added successefuly")
  }

  function removeItem(id) {
    setTodos(todos.filter(t => t.id !== id));
    toast("the item removed successefuly")
  }

  function updateItem(id, newTitle) {
    setTodos(todos.map(t => t.id === id ? { ...t, title: newTitle } : t));
    toast("the item updated successefuly")
  }

  function markAsDone(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, state: "Done" } : t));
    toast("the todo completed")
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos =  useMemo(()=>{ return todos.filter(t => {
   if (filter === "done") return t.state === "Done";
   if (filter === "pending") return t.state !== "Done";
   return true;
 })
 },[todos,filter]);


  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center">
      <Toaster/>
      <Card className="w-full max-w-md bg-secondary mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Todo List</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full mb-4" onValueChange={setFilter}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>

          <TodoCard
            todos={filteredTodos}
            removeItem={removeItem}
            updateItem={updateItem}
            markAsDone={markAsDone}
          />
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={addTodo}>
            <CirclePlus className="size-5" />
          </Button>
          <Input
            placeholder="New task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-lg"
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
