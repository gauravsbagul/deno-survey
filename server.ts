import { Application, Router, RouterContext } from "./deps.ts";
import router from "./router.ts";
import { staticFileMiddleware } from "./middlewares/staticFileMiddleware.ts";

const app = new Application();

app.use(staticFileMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log("TCL:: secure", secure);
  newFunction(secure, hostname, port);
});

app.addEventListener("error", (e) => {
  console.log("TCL:: e.error", e.error);
});
await app.listen({ port: 5000 });

function newFunction(
  secure: boolean,
  hostname: string | undefined,
  port: number,
) {
  console.log(
    `listening on ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
}
// run cmd :-> denon run --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable server.ts

//https://www.youtube.com/watch?v=TQUy8ENesGY&t=317s

// Postman collection static button
//[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c2aa3aa8e5fdd8fc7e2d)
// public link
// https://www.getpostman.com/collections/c2aa3aa8e5fdd8fc7e2d
