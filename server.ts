import { Application, Router, RouterContext } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("TCL:: secure", secure);
  console.log(
    `listening on ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
});
await app.listen({ port: 5000 });
