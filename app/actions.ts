'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveNote(_: unknown, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  await prisma.note.create({
    data: { title, content }
  })
  revalidatePath('/')
}
