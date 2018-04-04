/// <reference types="express" />
import express from "express";

declare module "express-force-https-schema" {
  export type EnabledFunction = (
    req: express.Request,
    res: express.Response,
    options: IOptions
  ) => boolean;

  export interface IOptions {
    enabled?: EnabledFunction | boolean;
    userAgentHeader?: string;
    schemaHeader?: string;
    skipUserAgents?: RegExp;
  }

  export function forceHttpsSchema(
    options?: IOptions
  ): (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;

  export default forceHttpsSchema;
}
