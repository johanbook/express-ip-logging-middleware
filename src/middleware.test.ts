import "jest-fetch-mock";

import * as express from "express";

import { fixtures } from "./test";
import createIPLoggingMiddleware from ".";

describe("createIPLoggingMiddleware", () => {
  it("logs lookup result", (done) => {
    fetchMock.mockResponseOnce(JSON.stringify(fixtures.LOOKUP_RESULT));

    const logIP = createIPLoggingMiddleware({
      logger: (result) => {
        expect(result).toEqual(fixtures.LOOKUP_RESULT);
        done();
      },
      onError: jest.fn(),
    });
    logIP({} as express.Request, {} as express.Response, jest.fn());
  });

  it("handles lookup failure", (done) => {
    fetchMock.mockResponse("", { status: 418 });

    const logIP = createIPLoggingMiddleware({
      logger: jest.fn(),
      onError: (error) => {
        expect(error.message).toBe("I'm a Teapot");
        done();
      },
    });
    logIP({} as express.Request, {} as express.Response, jest.fn());
  });
});
