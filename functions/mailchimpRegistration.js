const axios = require("axios")

exports.handler = (event, context, callback) => {
  axios
    .post(
      `${process.env.MAILCHIMP_REG}&EMAIL=${event.queryStringParameters.EMAIL}&c=__jp0`
    )
    .then(res => {
      const data = JSON.parse(res.data.replace("__jp0(", "").replace(")", ""))
      if (data.result === "success") {
        callback(null, {
          statusCode: 200,
          body: data.msg,
        })
      } else {
        callback(null, {
          statusCode: 400,
          body: data.msg,
        })
      }
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err),
      })
    })
}
