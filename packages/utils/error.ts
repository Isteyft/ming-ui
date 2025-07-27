import { isString } from "lodash-es"

class BaizeUIError extends Error { 
    constructor(message: string) { 
        super(message)
        this.name = "BaizeUIError"
    }
}

function createBaizeUIError(scope: string, msg: string) {
  return new BaizeUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createBaizeUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void { 
  //  if (process.env.NODE_ENV !== "production") {
  //   const err = isString(scope) ? createBaizeUIError(scope, msg!) : scope;
  //   console.warn(err);
  // }
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new BaizeUIError(`[${scope}]:${msg}`) : scope;
    console.warn(err);
  }
}
