import handlebars from 'handlebars'

export type MailTemplateVariabelModel = {
  [key: string]: string | number
}

export type MailTemplateModel = {
  templateHtml: string
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
    const parserTemplate = handlebars.compile(template.templateHtml)
    return parserTemplate(template.variables)
  }
}
