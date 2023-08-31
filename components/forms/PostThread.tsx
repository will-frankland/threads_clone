"use client";

// Next/React Imports
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ShadCN Imports
import { threadValidation } from "@/lib/validations/thread";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

// Component Imports
// import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}


function PostThread({ userId }: { userId: string}) {

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });
  return <h1>Post Thread Form</h1>
}

export default PostThread;