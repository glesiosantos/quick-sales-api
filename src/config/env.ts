export default {

  // setting nodemailer
  hostEmail: 'smtp.ethereal.email',
  portEmail: 995,
  secureEmail: true,
  requireTLSEmail: true,
  authUserEmail: 'estell64@ethereal.email',
  authUserPasswd: '6QyyC3rQpurnzctA3S',

  // setting db
  hostDb: process.env.HOSTDB,
  portDb: process.env.HOSTDB,
  usernameDb: process.env.USERDB,
  passwdDb: process.env.PASSWDDB,
  dbName: process.env.DBNAME
}
