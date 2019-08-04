import MailchimpSubscribe from "react-mailchimp-subscribe"
import React, { useState, ChangeEvent } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"

const Mailchimp = () => {
  const [email, setEmail] = useState<string>()

  return (
    <MailchimpSubscribe
      url={
        "https://gmail.us3.list-manage.com/subscribe/post?u=0a6b50e4167f49fa4b57a452a&amp;id=e20e17d6bc"
      }
      render={({ subscribe, status, message }) => (
        <div className="text-left">
          <span className="text-white px-4 py-2">Subscribe via Email</span>
          <div className="ml-5">
            <div>
              <Input
                type="email"
                className="text-black"
                style={{ width: "80%", margin: "10px auto" }}
                onChange={setEmail}
              />
            </div>
            <Button onClick={() => subscribe({ EMAIL: email })} size="sm">
              Subscribe
            </Button>
            <div className="mt-4 text-sm">
              {status === "sending" && <div>Sending...</div>}
              {status === "error" && (
                <div dangerouslySetInnerHTML={{ __html: message }} />
              )}
              {status === "success" && (
                <div>All done! Watch your email for the next post.</div>
              )}
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default Mailchimp
