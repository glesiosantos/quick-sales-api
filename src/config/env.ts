import 'dotenv/config'

export default {
  // setting nodemailer
  hostEmail: process.env.HOST_EMAIL as string,
  portEmail: process.env.PORT_EMAIL as number | undefined,
  secureEmail: process.env.SECURE_EMAIL as string,
  requireTLSEmail: process.env.REQUIRE_TLS_EMAIL,
  authUserEmail: process.env.AUTH_USER_EMAIL as string,
  authUserPasswd: process.env.AUTH_USER_PASSWD as string,
  emailDefaultBySend: 'support@quicksales.com.br',

  // setting db
  hostDb: process.env.HOSTDB,
  portDb: process.env.PORTDB as number | undefined,
  usernameDb: process.env.USERDB,
  passwdDb: process.env.PASSWDDB,
  dbName: process.env.DBNAME
}
