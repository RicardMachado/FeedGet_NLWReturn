import nodemailer from "nodemailer";
import { MailAdapter, ISendEmailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6132545688f216",
    pass: "82041497b6ac0e",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail({ subject, body }: ISendEmailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Ricardo Machado <ricardo.machado10.rm@gmail.com>",
      subject,
      html: body,
    });
  }
}
