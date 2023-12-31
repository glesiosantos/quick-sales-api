import env from '@config/env'
import createAccountFake from '@config/tranporter_nodemailer_config'
import nodemailer from 'nodemailer'

export type SendMailModel = {
  to: string
  from?: string
  subject: string
  body?: any
}

export class SendEmailService {
  async sendMailTest(data: SendMailModel): Promise<void> {
    const transporter = await createAccountFake()
    const message = transporter.sendMail({
      from: env.emailDefaultBySend,
      to: data.to,
      subject: data.subject,
      text: data.body
    })

    console.log('Message sent: %s', (await message).messageId)
    console.log('Preview URL: %s', (nodemailer.getTestMessageUrl(await message)))
  }
}
