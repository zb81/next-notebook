import nodemailer from 'nodemailer'
import { extractEnv } from './utils'
import singleton from './singleton'

export default singleton('mailer', () => {
  return nodemailer.createTransport({
    host: extractEnv('SMTP_HOST') as string,
    port: extractEnv('SMTP_PORT', 'number') as number,
    secure: true,
    auth: {
      user: extractEnv('SMTP_USER') as string,
      pass: extractEnv('SMTP_PASS') as string,
    },
  })
})
