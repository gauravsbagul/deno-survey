import { Application, Router, RouterContext } from "./deps.ts";
import router from "./router.ts";
import { staticFileMiddleware } from "./middlewares/staticFileMiddleware.ts";

const app = new Application();

app.use(staticFileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("TCL:: secure", secure);
  console.log(
    `listening on ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (e) => {
  console.log("TCL:: e.error", e.error);
});
await app.listen({ port: 5000 });

// run cmd - denon run --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable server.ts

//https://www.youtube.com/watch?v=TQUy8ENesGY&t=317s
