import nodemailer from 'nodemailer'
import env from '../env'

const transporter = nodemailer.createTransport({
  host: env.hostEmail,
  port: env.portEmail,
  auth: {
      user: env.authUserEmail,
      pass: env.authUserPasswd
  }
})

export default transporter
