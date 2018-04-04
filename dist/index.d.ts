/// <reference types="express" />
import express from "express";
export declare type EnabledFunction = (
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
export declare function forceHttpsSchema(
  options?: IOptions
): (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;
