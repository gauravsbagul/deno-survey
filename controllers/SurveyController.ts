import { RouterContext } from "../deps.ts";
import Survey from "./../modals/Survey.ts";
import BaseSurveyController from "./BaseSurveyController.ts";
class SurveyController extends BaseSurveyController {
  async getAllForUSer(ctx: RouterContext) {
    //@TODO
    const surveys = await Survey.findByUser("1");
    console.log("TCL:: SurveyController -> getAllForUSer -> surveys", surveys);

    ctx.response.body = surveys;
  }
  async getSingle(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.status = 404;
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
    const id = ctx.params.id!;

    const survey = await this.findSurveyOrFail(id, ctx);
    console.log("TCL:: SurveyController -> update -> survey", survey);

    if (survey) {
      const { value:{name, description} } = await ctx.request.body();
      console.log(
        "TCL:: SurveyController -> update -> description",
        description,
      );
      console.log("TCL:: SurveyController -> update -> name", name);

      await survey.update({ name, description });
      ctx.response.body = survey;
    }
  }
  async delete(ctx: RouterContext) {
  }
}

const surveyController = new SurveyController();

export default surveyController;
