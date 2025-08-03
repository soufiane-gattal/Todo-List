import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { ArrowUpFromLine, Trash, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodoCard({ todos, removeItem, updateItem, markAsDone }) {
  const [inputs, setInputs] = useState({});

  if (!todos || todos.length === 0) {
    return (
      <Card className="mb-2">
        <CardContent className="text-muted-foreground text-center">
          <p className="leading-7">No todos found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {todos.map((t) => (
        <Card key={t.id} className="mb-2 p-2">
          <CardContent className="text-lg flex justify-between items-center flex-wrap gap-2">
            <p className={`leading-7 max-w-[60%] ${
              t.state === "Done" ? "line-through text-muted-foreground" : ""
            }`}>
              {t.title}
            </p>
            <div className="flex gap-2 items-center">
              {t.state !== "Done" && (
                <Button variant="success" onClick={() => markAsDone(t.id)}>
                  <Check className="size-5" />
                </Button>
              )}

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Pencil className="size-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex gap-2">
                    <Input
                      value={inputs[t.id] || ""}
                      onChange={(e) =>
                        setInputs({ ...inputs, [t.id]: e.target.value })
                      }
                      placeholder="Edit todo"
                    />
                    <Button
                      onClick={() => {
                        if (inputs[t.id]?.trim()) {
                          updateItem(t.id, inputs[t.id]);
                          setInputs({ ...inputs, [t.id]: "" });
                        }
                      }}
                    >
                      <ArrowUpFromLine className="size-5" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" onClick={() => removeItem(t.id)}>
                <Trash className="size-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
