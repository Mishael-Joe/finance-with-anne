"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"

/**
 * Component to safely render HTML content from Quill editor
 * Uses DOMPurify to sanitize HTML and prevent XSS attacks
 *
 * @param content - The HTML content to render
 * @param className - Optional CSS class name
 */
export default function HtmlContent({
  content,
  className = "",
}: {
  content: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Configure DOMPurify to allow certain tags and attributes
      const purifyConfig = {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "p",
          "a",
          "ul",
          "ol",
          "li",
          "b",
          "i",
          "strong",
          "em",
          "strike",
          "code",
          "hr",
          "br",
          "div",
          "table",
          "thead",
          "caption",
          "tbody",
          "tr",
          "th",
          "td",
          "pre",
          "img",
          "span",
        ],
        ALLOWED_ATTR: ["href", "name", "target", "src", "alt", "class", "id", "style", "width", "height", "align"],
        // Allow safe URLs
        ALLOW_UNKNOWN_PROTOCOLS: false,
      }

      // Sanitize the HTML content
      const sanitizedContent = DOMPurify.sanitize(content, purifyConfig)

      // Set the sanitized HTML content
      containerRef.current.innerHTML = sanitizedContent

      // Make external links open in a new tab
      const links = containerRef.current.querySelectorAll("a")
      links.forEach((link) => {
        if (link.host !== window.location.host) {
          link.setAttribute("target", "_blank")
          link.setAttribute("rel", "noopener noreferrer")
        }
      })

      // Add responsive classes to images
      const images = containerRef.current.querySelectorAll("img")
      images.forEach((img) => {
        img.classList.add("max-w-full", "h-auto", "rounded-md")
      })
    }
  }, [content])

  return <div ref={containerRef} className={`prose prose-lg max-w-none ${className}`} />
}
