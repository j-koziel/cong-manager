"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

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
  DialogClose,
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { addInformationBoardItemThunk } from "@/lib/stores/thunks/add-information-board-item";
import { getCongInformationBoardItemsThunk } from "@/lib/stores/thunks/get-cong-information-board";
import {
  NewInformationBoardItem,
  newInformationBoardItemFormSchema,
} from "@/lib/types/dashboard";

/**
 * A card displaying all the information board items,
 * things like announcements, events and other important information.
 *
 * @returns Information board card
 *
 * @todo delete everything here and redesign it to fit a whole page
 * yay
 */
const InformationCard = () => {
  return (
    <Card className="p-10">
      <CardContent className="flex flex-col items-center">
        <EnvelopeOpenIcon height={48} width={48} />
        <p className="font-bold text-center">Information Board</p>
      </CardContent>
    </Card>
  );
};

// const informationBoardState = useSelector(
//   (state: RootState) => state.informationBoard,
// );
// const dashState = useSelector((state: RootState) => state.dashboard);

// const form = useForm<NewInformationBoardItem>({
//   resolver: zodResolver(newInformationBoardItemFormSchema),
//   defaultValues: {
//     type: "Announcement",
//     summary: undefined,
//     congregationId: dashState.currentUser?.congregationId,
//   },
// });

// const dispatch: AppDispatch = useDispatch();

// async function onSubmit(values: NewInformationBoardItem) {
//   dispatch(addInformationBoardItemThunk(values));
//   form.reset({
//     type: "Announcement",
//     summary: undefined,
//     congregationId: dashState.currentUser?.congregationId,
//   });
// }

// React.useEffect(() => {
//   dispatch(getCongInformationBoardItemsThunk());
// }, []);

// React.useEffect(() => {
//   if (informationBoardState.didError) {
//     toast({
//       title: "An error has occurred",
//       description: "The information board could not be loaded",
//       variant: "destructive",
//     });
//     return;
//   }
// }, []);

{
  /* <CardHeader>
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
    <SelectValue placeholder="Select the type of information this will be" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Announcement">
                                Announcement
                              </SelectItem>
                              <SelectItem value="Event">Event</SelectItem>
                              <SelectItem value="Information">
                                Information
                              </SelectItem>
                            </SelectContent>
                          </Select>
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
                    <Button type="submit">Add</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          {informationBoardState.informationBoard.length &&
            informationBoardState.informationBoard.map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{item.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>{item.summary}</span>
                </CardContent>
              </Card>
            ))}
          <ScrollBar />
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter> */
}

export default InformationCard;
