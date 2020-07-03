import { RouterContext } from "../deps.ts";
import Survey from "../modals/Survey.ts";
import User from "../modals/User.ts";
export default class BaseSurveyController {
  async findSurveyOrFail(
    id: string,
    ctx: RouterContext,
  ): Promise<Survey | null> {
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Incorrect Id" };
      return null;
    }
    //@TODO
    const user = ctx.state.user as User;

    if (survey.userId !== user.id) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: "You do not have permission on this survey",
      };
      return null;
    }

    return survey;
  }
}
