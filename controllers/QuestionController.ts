import { RouterContext } from "../deps.ts";
import BaseSurveyController from "./BaseSurveyController.ts";
import Question from "./../modals/Question.ts";
class QuestionController extends BaseSurveyController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    console.log(
      "TCL:: QuestionController -> getBySurvey -> surveyId",
      surveyId,
    );

    const survey = await this.findSurveyOrFail(surveyId, ctx);

    if (survey) {
      const questions = await Question.findBySurvey(surveyId);
      ctx.response.body = questions;
    }
  }
  async getSingle(ctx: RouterContext) {
  }
  async create(ctx: RouterContext) {
    const { value:{text, type, required, data} } = await ctx.request.body();
    const surveyId: string = ctx.params.surveyId!;

    const survey = await this.findSurveyOrFail(surveyId, ctx);

    if (survey) {
      const question = new Question(surveyId, text, type, required, data);
      const result = await question.create();
      ctx.response.status = 201;
      ctx.response.body = question;
    }
  }
  async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const question = await Question.findById(id);

    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid question id" };
      return;
    }
    const { value:{text, type, required, data} } = await ctx.request.body();
    await question.update(text, type, required, data);
    ctx.response.body = question;
  }
  async delete(ctx: RouterContext) {
    const id = ctx.params.id!;
    const question = await Question.findById(id);

    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid question id" };
      return;
    }
    const result = await question.delete();
    ctx.response.status = 204;
    ctx.response.body = { message: "Question deleted successfully" };
  }
}

const questionController = new QuestionController();

export default questionController;
