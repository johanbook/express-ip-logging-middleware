# express-ip-logging-middleware

This is an example of how one can create an Express middleware that looks up
incoming IP addresses and logs them. This can be useful for inspecting traffic
on a server. Note that the used IP lookup API is ratelimited and needs a paid
subscription for a larger amount of lookups.

## Configuring a logger

The `express-ip-logging-middleware` requires an external logger to work. I
recommend the [Winston](https://www.npmjs.com/package/winston) logger for this.
See `src/server.ts` for an example configuration.
