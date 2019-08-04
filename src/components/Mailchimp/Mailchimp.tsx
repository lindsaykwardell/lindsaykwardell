import MailchimpSubscribe from "react-mailchimp-subscribe"
import React, { useState, ChangeEvent } from "react"
import Button from "../Button/Button";
import Input from "../Input/Input"

const Mailchimp = () => {
  const [email, setEmail] = useState<string>();

  return (
    <MailchimpSubscribe
      url={"https://gmail.us3.list-manage.com/subscribe/post?u=0a6b50e4167f49fa4b57a452a&amp;id=e20e17d6bc"}
      render={({ subscribe, status, message }) => (
        <div className="text-left">
          <span className="text-white px-4 py-2">Subscribe via Email</span>
          <div className="ml-5">
            <Input type="email" className="my-3 text-black" style={{width: "80%"}} onChange={setEmail} />
            <Button onClick={() => subscribe({EMAIL: email})} size="sm">Subscribe</Button>
            {status === "sending" && <div>sending...</div>}
            {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{ __html: message }} />}
            {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
          </div>
        </div>
      )}
    />
  )
}

export default Mailchimp;