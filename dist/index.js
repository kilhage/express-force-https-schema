"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultOptions = {
  enabled: true,
  userAgentHeader: "user-agent",
  schemaHeader: "x-forwarded-proto"
};
function skipUserAgent(req, res, options) {
  if (!options.skipUserAgents) {
    return false;
  }
  const userAgentHeader = options.userAgentHeader;
  const userAgent = req.headers[userAgentHeader];
  return options.skipUserAgents.test(userAgent);
}
function forceHttpsSchema(options = {}) {
  options = Object.assign({}, defaultOptions, options);
  return (req, res, next) => {
    const schemaHeader = options.schemaHeader;
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
exports.forceHttpsSchema = forceHttpsSchema;
exports.default = forceHttpsSchema;
