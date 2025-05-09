"use client"

import { z } from "zod"

const formSchema = z.object({
  login: z.string().min(1).max(50),
  password: z.string().min(8).max(50),
})

export type FormSchema = z.infer<typeof formSchema>
export { formSchema }