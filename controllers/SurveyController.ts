import { RouterContext } from "../deps.ts";
import Survey from "./../modals/Survey.ts";
import BaseSurveyController from "./BaseSurveyController.ts";
import User from "../modals/User.ts";
class SurveyController extends BaseSurveyController {
  async getAllForUSer(ctx: RouterContext) {
    //@TODO
    const user = ctx.state.user as User;
    const surveys = await Survey.findByUser(user.id);

    ctx.response.body = surveys;
  }
  async getSingle(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      ctx.response.body = survey;
    }
  }
  async create(ctx: RouterContext) {
    const { value:{name, description} } = await ctx.request.body();
    const user = ctx.state.user as User;
    if (!name || !description) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide name and description" };
      return;
    }
    //@TODO
    const survey = new Survey(user.id, name, description);
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }
  async update(ctx: RouterContext) {
    const id = ctx.params.id!;

    const survey = await this.findSurveyOrFail(id, ctx);

    if (survey) {
      const { value:{name, description} } = await ctx.request.body();
      await survey.update({ name, description });
      ctx.response.body = survey;
    }
  }
  async delete(ctx: RouterContext) {
    const id = ctx.params.id!;

    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      await survey.delete(id);
      ctx.response.status = 204;
      ctx.response.body = { message: "Survey deleted successfully" };
    }
  }
}

const surveyController = new SurveyController();

export default surveyController;
