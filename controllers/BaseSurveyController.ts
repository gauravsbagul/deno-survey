import { RouterContext } from "../deps.ts";
import Survey from "../modals/Survey.ts";
export default class BaseSurveyController {
  async findSurveyOrFail(
    id: string,
    ctx: RouterContext,
  ): Promise<Survey | null> {
    const survey = await Survey.findById(id);
    console.log("TCL:: BaseSurveyController -> survey", survey);
    if (!survey) {
      console.log("TCL:: BaseSurveyController -> !survey", !survey);
      ctx.response.status = 404;
      ctx.response.body = { message: "Incorrect Id" };
      return null;
    }
    return survey;
  }
}
