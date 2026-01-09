import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Item } from "fumadocs-core/page-tree"
  
interface PageNavigationProps {
  previous: Item | null
  next: Item | null
}

export function PageNavigation({ previous, next }: PageNavigationProps) {
  if (!previous && !next) return null
  
  return (
    <ButtonGroup>
      {previous && (
        <Button variant="outline" size="sm" asChild>
          <Link href={previous.url}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous: {previous.name}</span>
          </Link>
        </Button>
      )}
      {next && (
        <Button variant="outline" size="sm" asChild>
          <Link href={next.url}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next: {next.name}</span>
          </Link>
        </Button>
      )}
    </ButtonGroup>
  )
}