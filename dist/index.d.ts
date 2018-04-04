declare module "express-force-https-schema" {
  export type EnabledFunction = (
    req: Express.Request,
    res: Express.Response,
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
    req: Express.Request,
    res: Express.Response
  ) => void;

  export default forceHttpsSchema;
}
