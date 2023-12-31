import handlebars from 'handlebars'
import fs from 'fs'

export type MailTemplateVariabelModel = {
  [key: string]: string | number
}

export type MailTemplateModel = {
  file: string
  variables: MailTemplateVariabelModel[]
}

export type ContactMail = {
  name: string
  email: string
}

export type SendMailModel = {
  to: ContactMail
  from?: ContactMail
  subject: string
  templateData: MailTemplateModel
}

export default class HandleBarsMailTemplate {
  public async parseHTML(template: MailTemplateModel): Promise<string> {
    const templateFileContent = await fs.promises.readFile(template.file, { encoding: 'utf-8' })
    const parserTemplate = handlebars.compile(templateFileContent)
    return parserTemplate(template.variables)
  }
}
