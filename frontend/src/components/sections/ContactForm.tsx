"use client"

import React, { type ChangeEvent, useState } from "react"
import { Input } from "../shared/ui/input"
import { Label } from "../shared/ui/label"
import { Textarea } from "../shared/ui/textarea"
import LoadingButton from "../shared/ui/loading-button"
import { cn } from "@/lib/utils"

type ContactFormProps = {
  className?: string
}

export default function ContactForm(props: ContactFormProps) {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function onMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value)
  }

  return (
    <div
      className={cn(
        "mx-auto min-h-[400px] max-w-7xl p-5 py-10",
        props.className,
      )}
    >
      <div className="flex w-full flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-muted-foreground">
          Reach out to us with any questions you might have.
        </p>
      </div>
      <form className="mx-auto mt-10 max-w-2xl space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            value={email}
            onChange={(e) => onEmailChange(e)}
            placeholder="example@domain.com"
            type="email"
            id="email"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Message Content</Label>
          <Textarea
            value={message}
            onChange={(e) => onMessageChange(e)}
            placeholder="Hello, I am interested in..."
            id="message"
            required
          />
        </div>
        <div className="flex w-full justify-end pt-2">
          <LoadingButton type="submit" isLoading={false}>
            Send Message
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
