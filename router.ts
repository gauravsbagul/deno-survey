import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    console.log("TCL:: ctx", ctx);
    ctx.response.body = "hello deno";
  })
  .post("/api/register", authController.register)
  .post("/api/login", authController.login);

export default router;
