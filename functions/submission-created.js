const axios = require("axios")
const uuid = require("uuid").v4
const moment = require("moment")
const crypto = require("crypto")

exports.handler = (event, context, callback) => {
  const payload = JSON.parse(event.body).payload
  const { postTitle, postPath, author, email, message } = payload.data

  const filePath = `src/content/comments/${uuid()}.md`
  const content = `---
postPath: "${postPath}"
date: ${moment.utc().format("YYYY-MM-DD HH:mm:ss")}
author: "${author}"
authorId: "${crypto
    .createHash("md5")
    .update(email)
    .digest("hex")}"
---
${message}`

  const buildEndpoint = () =>
    "https://api.github.com/repos/lindsaykwardell/lindsaykwardell.com/contents/" +
    filePath

  axios
    .put(
      buildEndpoint(),
      {
        message: `New comment on ${postTitle}`,
        branch: "new-comments",
        author: {
          name: "Lindsay Wardell",
          email: "three060@gmail.com",
        },
        committer: {
          name: "Lindsay Wardell",
          email: "three060@gmail.com",
        },
        content: Buffer.from(content).toString("base64"),
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
        },
      }
    )
    .then(res =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: "Your comment has been submitted!" }),
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ msg: "An error occurred!", err }),
      })
    )
}
