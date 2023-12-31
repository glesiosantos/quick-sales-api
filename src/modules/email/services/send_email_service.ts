import env from '@config/env'
import HandleBarsMailTemplate, { SendMailModel } from '@config/mails/templates/handle_bars_mail_template'
import createAccountFake from '@config/mails/tranporter_nodemailer_config'
import nodemailer from 'nodemailer'

export class SendEmailService {
  async sendMailTest(send: SendMailModel): Promise<void> {
    const mailTemplate = new HandleBarsMailTemplate()
    const transporter = await createAccountFake()
    const message = transporter.sendMail({
      from: env.emailDefaultBySend,
      to: send.to.email,
      subject: send.subject,
      html: await mailTemplate.parseHTML(send.templateData)
    })

    console.log('Message sent: %s', (await message).messageId)
    console.log('Preview URL: %s', (nodemailer.getTestMessageUrl(await message)))
  }
}
