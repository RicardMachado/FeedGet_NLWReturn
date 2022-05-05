import { FeedbacksRepository } from "../repositories/feedbacksRepository";
import { MailAdapter } from "../adapters/MailAdapter";

interface ISubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: ISubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required.')
    }

    if(!comment) {
      throw new Error('Comment is required.')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendEmail({
      subject: "Novo feedback",
      body: [
        `<div style="font-famaly: roboto; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `<img src="${screenshot}" alt="Screenshot"/>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
