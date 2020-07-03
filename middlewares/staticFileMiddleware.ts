import { Context, send } from "../deps.ts";
import { fileExists } from "../helpers.ts";

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  console.log("TCL:: staticFileMiddleware -> ctx", ctx.request.url);
  console.log(
    "TCL:: staticFileMiddleware -> ctx.request.url.pathname",
    ctx.request.url.pathname,
  );
  const path = `${Deno.cwd()}/assets${ctx.request.url.pathname}`;
  if (await fileExists(path)) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/assets`,
    });
  } else {
    await next();
  }
};
