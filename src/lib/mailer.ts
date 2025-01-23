import nodemailer from 'nodemailer'
import { extractEnv } from './utils'

const mailerSingleton = () =>
  nodemailer.createTransport({
    host: extractEnv('SMTP_HOST') as string,
    port: extractEnv('SMTP_PORT', 'number') as number,
    secure: true,
    auth: {
      user: extractEnv('SMTP_USER') as string,
      pass: extractEnv('SMTP_PASS') as string,
    },
  })

declare const globalThis: {
  mailerGlobal: ReturnType<typeof mailerSingleton>
} & typeof global

const mailer = globalThis.mailerGlobal ?? mailerSingleton()

export default mailer

if (process.env.NODE_ENV !== 'production') globalThis.mailerGlobal = mailer
