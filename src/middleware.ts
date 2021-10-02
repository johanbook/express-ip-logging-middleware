import * as express from "express";

import ipLookup, { Logger } from "./ipLookup";

export interface CreateIPLoggingMiddlewareProps {
  /** Logger for IP lookup results */
  logger: Logger;
  /** How errors should be handled */
  onError(error: Error): void;
}

/** Creates an Express middleware that logs incoming IPs */
export default function createIPLoggingMiddleware({
  logger,
  onError,
}: CreateIPLoggingMiddlewareProps) {
  return (
    request: express.Request,
    _: express.Response,
    next: express.NextFunction
  ): void => {
    ipLookup(request.ip, { logger, onError });
    next();
  };
}
