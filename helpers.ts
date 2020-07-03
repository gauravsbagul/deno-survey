import { renderFileToString } from "https://deno.land/x/dejs@0.7.0/mod.ts";
export const renderView = (view: string, params: object = {}) => {
  return renderFileToString(`${Deno.cwd}/views${view}.ejs`, params);
};

export const fileExists = async (fileName: string): Promise<boolean> => {
  console.log("TCL::fileExists fileName", fileName);
  try {
    const stats = await Deno.lstat(fileName);

    return stats && stats.isFile;
  } catch (err) {
    if (err && err instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw err;
    }
  }
};
