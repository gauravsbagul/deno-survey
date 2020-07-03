import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import surveyController from "./controllers/SurveyController.ts";
import { authMiddleware } from "./middlewares/authMiddleware.ts";
const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "hello deno";
  })
  .post("/api/register", authController.register)
  .post("/api/login", authController.login)
  // For survey
  .get(
    "/api/survey",
    authMiddleware,
    surveyController.getAllForUSer.bind(surveyController),
  )
  .get(
    "/api/survey/:id",
    authMiddleware,
    surveyController.getSingle.bind(surveyController),
  )
  .post(
    "/api/survey",
    authMiddleware,
    surveyController.create.bind(surveyController),
  )
  .put(
    "/api/survey/:id",
    authMiddleware,
    surveyController.update.bind(surveyController),
  )
  .delete(
    "/api/survey/:id",
    authMiddleware,
    surveyController.delete.bind(surveyController),
  );

export default router;
