import React, { useState } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"
import axios from "axios"

const Mailchimp = () => {
  const [email, setEmail] = useState<string>()
  const [isSending, toggleSending] = useState<boolean>(false)
  const [err, setErr] = useState<boolean>()
  const [msg, setMsg] = useState<string>()

  const subscribe = () => {
    toggleSending(true)
    axios
      .get<string>(`/.netlify/functions/mailchimpRegistration?EMAIL=${email}`)
      .then(({ data }) => {
        setMsg(data)
        toggleSending(false)
      })
      .catch(err => {
        setErr(true)
        setMsg(err.response.data)
        toggleSending(false)
      })
  }

  return (
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
        <Button onClick={subscribe} size="sm">
          Subscribe
        </Button>
        <div className="mt-4 text-sm">
          {isSending ? (
            "Sending..."
          ) : err ? (
            <div dangerouslySetInnerHTML={{ __html: msg }} />
          ) : (
            msg
          )}
        </div>
      </div>
    </div>
  )
}

export default Mailchimp
