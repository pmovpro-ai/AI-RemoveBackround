"use server";

import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required" };
  }

  try {
    await db.insert(contacts).values({
      name,
      email,
      message,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { error: "Failed to submit message" };
  }
}