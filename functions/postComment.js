const { gitCommitPush } = require("git-commit-push-via-github-api")
const uuid = require("uuid/v4")
const moment = require("moment")

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)

  const { postTitle, postPath, name, email, message } = data

  gitCommitPush({
    owner: "lindsaykwardell",
    repo: "lindsaykwardell.com",
    files: [
      {
        path: `src/content/comments/${uuid()}`,
        content: `---
path: "${postPath}"
date: ${moment().format("YYYY-MM-DD")}
author: "${name}"
email: "${email}"
---
${message}
        `,
      },
    ],
    fullyQualifiedRef: "heads/new-comments",
    commitMessage: `New comment on ${postTitle}`,
  })
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
