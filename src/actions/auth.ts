'use server'

import { hashPassword } from '@/lib/crypt'
import mailer from '@/lib/mailer'
import prisma from '@/lib/prisma'
import redis, { signUpVerificationCodeKey } from '@/lib/redis'
import { genVerificationCode } from '@/lib/utils'
import { SignUpFormSchema } from '@/lib/zod'

export async function validateEmailAndSendCode({ email }: SignUpFormSchema) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    const code = genVerificationCode()
    await mailer.sendMail({
      from: `Next Notebook <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Next Notebook Verification Code',
      text: `Your verification code is ${code}`,
    })
    await redis.set(signUpVerificationCodeKey(email), code, 'EX', 60 * 5)
    return true
  }

  return false
}

export async function checkCodeAndSignUp({
  email,
  password,
  code,
}: SignUpFormSchema & { code: string }) {
  const storedCode = await redis.get(signUpVerificationCodeKey(email))
  if (storedCode === code) {
    await redis.del(signUpVerificationCodeKey(email))
    const { hash, hashAlgorithm, salt, iterations } =
      await hashPassword(password)
    await prisma.user.create({
      data: {
        email,
        hash,
        hashAlgorithm,
        username: email,
        salt,
        iterations,
      },
    })

    return true
  }

  return false
}
