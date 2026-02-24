"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

export function InstallButton() {
  const [copied, setCopied] = React.useState(false)
  const command = "npm i osprotocol"

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-mono border border-border rounded-md bg-transparent hover:bg-accent transition-colors"
    >
      <span>{command}</span>
      {copied ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4 text-muted-foreground" />
      )}
    </button>
  )
}
