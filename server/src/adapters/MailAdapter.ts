export interface ISendEmailData {
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendEmail: (data: ISendEmailData) => Promise<void>;
}