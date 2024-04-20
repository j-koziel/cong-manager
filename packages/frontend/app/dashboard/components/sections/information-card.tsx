"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import ItemCards from "../item-cards";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { addInformationBoardItemThunk } from "@/lib/stores/thunks/add-information-board-item";
import {
  InformationBoardItem,
  newInformationBoardItemFormSchema,
} from "@/lib/types/dashboard";
import { PlaceholderDashboardData } from "@/lib/types/placeholder-dashboard-data";

const InformationCard = ({ data }: { data: PlaceholderDashboardData[] }) => {
  const form = useForm<InformationBoardItem>({
    resolver: zodResolver(newInformationBoardItemFormSchema),
    defaultValues: {
      type: "",
      summary: undefined,
      file: undefined,
    },
  });

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.informationBoard);

  async function onSubmit(values: InformationBoardItem) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    dispatch(addInformationBoardItemThunk(values));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Information Board: </CardTitle>
            <CardDescription>
              Here is the congregation information board
            </CardDescription>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button size="sm">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Add something to the information board
                </DialogTitle>
                <DialogDescription>
                  Add a new item to the information board for your congregation
                </DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Announcement"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary:</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="A new brother has joined our congregation..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File:</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Add</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      {/* Probably put some links to docs here...? */}
      <CardContent>
        <ScrollArea className="h-72">
          <ItemCards data={data} />
          <ScrollBar />
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default InformationCard;
