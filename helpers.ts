import { renderFileToString } from "https://deno.land/x/dejs@0.7.0/mod.ts";

export const renderView = async (view: string, params: object = {}) => {
  console.log("TCL:: renderView -> view", view);
  return await renderFileToString(`${Deno.cwd()}/views/${view}.ejs`, params);
};

export const fileExists = async (fileName: string): Promise<boolean> => {
  console.log("TCL:: fileName", fileName);
  try {
    const stats = await Deno.lstat(fileName);

    return stats && stats.isFile || false;
  } catch (err) {
    console.log("TCL:: fileExists err", err);
    if (err && err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
};
