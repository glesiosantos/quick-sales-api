import nodemailer from 'nodemailer'

export type SendMailModel = {
  to: string
  from?: string
  subject: string
  body?: any
}

export class SendEmailService {
  async sendMailTest(data: SendMailModel): Promise<void> {
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
    const message = transporter.sendMail({
      from: 'support@quicksales.com.br',
      to: data.to,
      subject: data.subject,
      text: data.body
    })

    console.log('Message sent: %s', (await message).messageId)
    console.log('Preview URL: %s', (nodemailer.getTestMessageUrl(await message)))
  }
}
