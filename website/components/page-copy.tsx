"use client"

import * as React from "react"
import { Check, Copy, ChevronDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PageCopyProps {
  page: string
  url: string
}

export function PageCopy({ page, url }: PageCopyProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(page)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
      >
        {copied ? (
          <>
            <Check className="mr-2 size-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="mr-2 size-4" />
            Copy page
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="!pl-2">
            <ChevronDown className="size-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={copyToClipboard} disabled={copied}>
            {copied ? (
              <>
                <Check className="mr-2 size-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 size-4" />
                Copy page
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <FileText className="mr-2 size-4" />
              View as Markdown
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

