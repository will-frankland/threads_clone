"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";

// Zod Imports
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"

// ShadCN Imports
import { userValidation } from "@/lib/validations/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { ChangeEvent } from "react";

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

const AccountProfile = ({ user, btnTitle }: Props) => {
  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
    e.preventDefault()
  }

  function onSubmit(values: z.infer<typeof userValidation>) { 
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">{field.value ? (
                <Image
                  src={field.value}
                  alt="profile photo"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full object-contain"
                />
              ) : (
                <Image
                src="/assets/profile.svg"
                alt="profile photo"
                width={24}
                height={24}
                className="object-contain"
              />
              )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>  
  );
};

export default AccountProfile;
