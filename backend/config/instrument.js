import * as Sentry from "@sentry/node";

console.log("Sentry DSN:", process.env.SENTRY_DSN);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    Sentry.mongooseIntegration()
  ],
  // tracesSampleRate: 1.0,
});

export default Sentry;








