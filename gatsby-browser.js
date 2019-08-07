/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const Sentry = require("@sentry/browser")

exports.onClientEntry = () => {
  if (process.env.NODE_ENV !== "development")
    Sentry.init({
      dsn: process.env.GATSBY_SENTRY_DSN,
    })
}
