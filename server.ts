import {
  Application,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v5.3.1/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: RouterContext) => {
  console.log("TCL:: ctx", ctx);
  ctx.response.body = "Hello Deno";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("TCL:: secure", secure);
  console.log(
    `listening on ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
});
await app.listen({ port: 8000 });
