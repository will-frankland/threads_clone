"use server";
import { connectToDb } from "../mongoose";

// Model Imports
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  connectToDb();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path); // allows you to revalidate data associated with a specific path
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
