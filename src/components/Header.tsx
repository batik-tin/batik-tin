import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/Button'
import { Search } from 'lucide-react'

export function Header() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [blogs, setBlogs] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener(
      'keydown',
      event => {
        if (event.key === '/') {
          event.preventDefault()
          setIsVisible(true)
          setIsOpen(true)
          requestAnimationFrame(() => {
            inputRef.current?.focus()
          })
        }
      },
      { signal: controller.signal },
    )

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (isOpen && blogs === null) {
      fetch('/blogs.json').then(response => {
        response.json().then(setBlogs)
      })
    }
  }, [isOpen])

  const searchLowerCase = search.toLowerCase()
  const searchResult =
    blogs &&
    search &&
    Object.entries(blogs).filter(([_, label]) => label.toLowerCase().includes(searchLowerCase))

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-xs font-bold text-white">BTK</span>
            </div>
            <span className="text-xl font-bold">Batik</span>
          </a>

          <div className="flex items-center">
            {isOpen && (
              <div className="relative mr-2 ml-6 w-full sm:w-32 md:w-48 lg:w-64">
                <input
                  ref={inputRef}
                  value={search}
                  onInput={e => setSearch(e.currentTarget.value)}
                  onFocus={() => setIsVisible(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsVisible(false)
                      setSelectedIndex(-1)
                    }, 100)
                  }
                  onKeyDown={event => {
                    if (searchResult && searchResult.length) {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setSelectedIndex(i => Math.min(i + 1, searchResult.length - 1))
                      } else if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        setSelectedIndex(i => Math.max(i - 1, -1))
                      } else if (event.key === 'Escape') {
                        event.preventDefault()
                        setIsVisible(false)
                        inputRef.current?.blur()
                      } else if (event.key === 'Enter') {
                        if (selectedIndex !== -1) {
                          location.href = `/blog/${searchResult[selectedIndex][0]}`
                        }
                      }
                    }
                  }}
                  className="w-full rounded-md border px-4 py-2"
                />

                {isVisible && searchResult && searchResult.length > 0 && (
                  <div className="absolute flex flex-col gap-2 rounded-md border bg-white px-4 py-2">
                    {searchResult.map(([slug, label], index) => (
                      <a
                        key={slug}
                        href={`/blog/${slug}`}
                        className={selectedIndex === index ? 'font-bold' : undefined}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={() => setIsOpen(o => !o)}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
