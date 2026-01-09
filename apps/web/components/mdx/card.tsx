import { Card as ShadcnCard, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode, ReactElement } from "react"
import Link from "next/link"

interface CardProps {
  icon: ReactElement
  href?: string
  title: string
  children: ReactNode
}

interface CardsProps {
  children: ReactNode
}

export function Cards({ children }: CardsProps) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>
}

export function Card({ icon, href, title, children }: CardProps) {
  const cardContent = (
    <ShadcnCard className="group relative overflow-hidden border bg-card/10 transition-all duration-300 hover:shadow-md">
      {/* Icon watermark in corner */}
      <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.02] transition-opacity duration-300 group-hover:opacity-[0.04]">
        <div className="h-48 w-48 [&>svg]:h-full [&>svg]:w-full [&>svg]:text-foreground">{icon}</div>
      </div>

      {/* Content */}
      <CardHeader className="relative space-y-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{children}</CardDescription>
      </CardHeader>
    </ShadcnCard>
  )

  if (href) {
    return (
      <Link href={href} className="block no-underline text-inherit hover:no-underline">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
