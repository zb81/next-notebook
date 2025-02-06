import { AbstractIntlMessages } from 'next-intl'
import { z } from 'zod'

export function signUpFormSchema(messages: AbstractIntlMessages) {
  const m = messages['Auth'] as Record<string, string>
  return z.object({
    email: z
      .string()
      .nonempty({ message: m['emailRequired'] })
      .email({ message: m['emailValid'] }),
    password: z
      .string()
      .nonempty({ message: m['passwordRequired'] })
      .min(6, { message: m['passwordMin'] })
      .max(18, { message: m['passwordMax'] }),
  })
}
export type SignUpFormSchema = z.infer<ReturnType<typeof signUpFormSchema>>

export function signInFormSchema(messages: AbstractIntlMessages) {
  const m = messages['Auth'] as Record<string, string>
  return z.object({
    email: z.string().trim().nonempty({ message: m['emailRequired'] }),
    password: z.string().trim().nonempty({ message: m['passwordRequired'] }),
  })
}
export type SignInFormSchema = z.infer<ReturnType<typeof signInFormSchema>>

export function noteFormSchema(messages: AbstractIntlMessages) {
  const m = messages['Edit'] as Record<string, string>
  return z.object({
    title: z.string().trim().nonempty({ message: m['titleRequired'] }),
    content: z.string().trim().nonempty({ message: m['contentRequired'] }),
  })
}
export type NoteFormSchema = z.infer<ReturnType<typeof noteFormSchema>>
