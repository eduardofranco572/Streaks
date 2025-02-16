export const replacePathParams = (
    path: string,
    params: Record<string, string | number>
  ) => {
    for (const key in params) {
      path = path.replace(`[${key}]`, params[key].toString());
    }
  
    return path;
  };