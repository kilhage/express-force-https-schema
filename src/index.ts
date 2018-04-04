import express from "express";

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

const defaultOptions = {
  enabled: true,
  userAgentHeader: "user-agent",
  schemaHeader: "x-forwarded-proto"
};

function skipUserAgent(
  req: express.Request,
  res: express.Response,
  options: IOptions
): boolean {
  if (!options.skipUserAgents) {
    return false;
  }

  const userAgentHeader: any = options.userAgentHeader;
  const userAgent: any = req.headers[userAgentHeader];
  return options.skipUserAgents.test(userAgent);
}

export function forceHttpsSchema(options: IOptions = {}) {
  options = { ...defaultOptions, ...options };

  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const schemaHeader: any = options.schemaHeader;
    let enabled = true;

    if (typeof options.enabled === "function") {
      enabled = options.enabled(req, res, options);
    }

    if (typeof options.enabled === "boolean") {
      enabled = options.enabled;
    }

    if (
      enabled &&
      req.headers[schemaHeader] !== "https" &&
      !skipUserAgent(req, res, options)
    ) {
      res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  };
}
