"use client";

// Next/React Imports
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import Image from "next/image";

// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { commentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "../ui/button";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment ({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof commentValidation>>({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    console.log('here')
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;