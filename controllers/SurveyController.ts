import { RouterContext } from "../deps.ts";
import Survey from "./../modals/Survey.ts";
class SurveyController {
  async getAllForUSer(ctx: RouterContext) {
    //@TODO
    ctx.response.body = await Survey.findByUser("1");
  }
  async getSingle(ctx: RouterContext) {
  }
  async create(ctx: RouterContext) {
    const { value:{name, description} } = await ctx.request.body();
    if (!name || !description) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Please provide name and description" };
      return;
    }
    //@TODO
    const survey = new Survey("1", name, description);
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }
  async update(ctx: RouterContext) {
  }
  async delete(ctx: RouterContext) {
  }
}

const surveyController = new SurveyController();

export default surveyController;
