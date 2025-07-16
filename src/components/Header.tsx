import { useEffect, useRef, useState, type PropsWithChildren } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { flushSync } from 'react-dom'

export function Header({ children }: PropsWithChildren) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [batikList, setBatikList] = useState<Record<string, string> | null>(null)

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
    if (isOpen && batikList === null) {
      fetch('/batikList.json').then(response => {
        response.json().then(setBatikList)
      })
    }
  }, [isOpen])

  const searchLowerCase = search.toLowerCase()
  const searchResult =
    batikList &&
    search &&
    Object.entries(batikList).filter(([_, label]) => label.toLowerCase().includes(searchLowerCase))

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex shrink-0 items-center gap-4 space-x-2 sm:shrink-[unset]">
            {children}
          </a>

          <div className="flex flex-1 items-center sm:flex-[unset]">
            {isOpen && (
              <div className="relative mr-2 ml-4 w-full sm:ml-auto sm:w-32 md:w-48 lg:w-64">
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
                          location.href = `/batik/${searchResult[selectedIndex][0]}`
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
                        href={`/batik/${slug}`}
                        className={selectedIndex === index ? 'font-bold' : undefined}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                requestAnimationFrame(() => {
                  flushSync(() => {
                    setIsOpen(o => !o)
                  })

                  inputRef.current?.focus()
                })
              }}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
