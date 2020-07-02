import { RouterContext } from "../deps.ts";
import Survey from "./../modals/Survey.ts";
class SurveyController {
  async getAllForUSer(ctx: RouterContext) {
    //@TODO
    const surveys = await Survey.findByUser("1");
    console.log("TCL:: SurveyController -> getAllForUSer -> surveys", surveys);

    ctx.response.body = surveys;
  }
  async getSingle(ctx: RouterContext) {
    const id = ctx.params.id!;
    console.log("TCL:: SurveyController -> getSingle -> id", id);
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.status = 4040;
      ctx.response.body = { message: "Incorrect Id" };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = survey;
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
