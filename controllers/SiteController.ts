import Survey from "../modals/Survey.ts";
import { renderFileToString, RouterContext } from "../deps.ts";
import { renderView } from "../helpers.ts";

class SiteController {
  async surveys(ctx: RouterContext) {
    const surveys = await Survey.findAll();
    ctx.response.body = await renderView(`surveys`, { surveys });
  }

  async viewSurvey(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    console.log("TCL:: SiteController -> viewSurvey -> id", id);

    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.body = await renderView(`notfound`);
    }
  }
}

const siteController = new SiteController();
export default siteController;
