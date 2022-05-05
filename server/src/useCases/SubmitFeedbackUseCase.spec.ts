import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendEmail: sendEmailSpy },
)

describe('Submit feedback', () => {
    
    it('should be able to submit a feedback', async() => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,1545445s5sdgdfhgdtrh3gdf57g4df',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async() => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,1545445s5sdgdfhgdtrh3gdf57g4df',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async() => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,1545445s5sdgdfhgdtrh3gdf57g4df',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an invalid screenshot', async() => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });

})