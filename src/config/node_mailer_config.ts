import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 995,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'estell64@ethereal.email',
      pass: '6QyyC3rQpurnzctA3S'
  }
})

export default transporter
