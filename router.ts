import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";
const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "hello deno";
  })
  .post("/api/register", authController.register)
  .post("/api/login", authController.login)
  // For survey
  .get("/api/survey", surveyController.getAllForUSer)
  .get("/api/survey/:id", surveyController.getSingle)
  .post("/api/survey", surveyController.create)
  .put("/api/survey/:id", surveyController.update)
  .delete("/api/survey/:id", surveyController.delete);

export default router;
