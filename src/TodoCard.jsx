import { useState } from "react";
import { Card, CardContent, CardAction } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";

export default function TodoCard({ todos, removeItem, updateItem }) {
  const [inputs, setInputs] = useState({});
  if (!todos || todos.length === 0) {
    return (
      <Card className="mb-2">
        <CardContent className="text-muted-foreground">
          Todos Not found
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {todos.map((t) => (
        <Card key={t.id} className="mb-2 p-2">
          <CardContent className="text-lg flex justify-between items-center flex-wrap">
            {t.title}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mr-2">
                    <Pencil className="size-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex justify-start items-center">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        if (inputs[t.id] && inputs[t.id].trim().length > 0) {
                          updateItem(t.id, inputs[t.id]);
                        }
                      }}
                    >
                      <ArrowUpFromLine className="size-6" />
                    </Button>
                    <Input
                      value={inputs[t.id] || ""}
                      onChange={(e) => {
                        setInputs({ ...inputs, [t.id]: e.target.value });
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" onClick={() => removeItem(t.id)}>
                <Trash className="size-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
