import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export default async function createAccountFake(): Promise<Transporter<SMTPTransport.SentMessageInfo>> {
  const account = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  })

  return transporter
}
