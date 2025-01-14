import { AbstractIntlMessages } from 'next-intl'
import { z } from 'zod'

export function signUpFormSchema(messages: AbstractIntlMessages) {
  const m = messages['SignUpForm'] as Record<string, string>
  return z
    .object({
      username: z
        .string()
        .min(2, { message: m['usernameMin'] })
        .max(12, { message: m['usernameMax'] }),
      email: z.string().email({ message: m['emailValid'] }),
      password: z
        .string()
        .min(6, { message: m['passwordMin'] })
        .max(18, { message: m['passwordMax'] }),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: m['confirmPasswordSame'],
      path: ['confirmPassword'],
    })
}
export type SignUpFormSchema = z.infer<ReturnType<typeof signUpFormSchema>>

export function signInFormSchema(messages: AbstractIntlMessages) {
  const m = messages['SignInForm'] as Record<string, string>
  return z.object({
    identifier: z
      .string()
      .trim()
      .nonempty({ message: m['identifierRequired'] }),
    password: z.string().trim().nonempty({ message: m['passwordRequired'] }),
  })
}
export type SignInFormSchema = z.infer<ReturnType<typeof signInFormSchema>>
