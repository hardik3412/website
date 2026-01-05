'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './SearchBar.module.css'

interface SearchResult {
    id: string
    title: string
    category: string
    price: number
    imageUrl: string
}

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const searchProjects = async () => {
            if (query.length < 2) {
                setResults([])
                setIsOpen(false)
                return
            }

            setLoading(true)
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                if (res.ok) {
                    const data = await res.json()
                    setResults(data)
                    setIsOpen(true)
                }
            } catch (err) {
                console.error('Search error:', err)
            } finally {
                setLoading(false)
            }
        }

        const debounce = setTimeout(searchProjects, 300)
        return () => clearTimeout(debounce)
    }, [query])

    const handleSelect = (id: string) => {
        setIsOpen(false)
        setQuery('')
        router.push(`/projects/${id}`)
    }

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchWrapper}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                {loading && <div className={styles.loader} />}
            </div>

            {isOpen && (
                <div className={styles.resultsDropdown}>
                    {results.length > 0 ? (
                        results.map((project) => (
                            <button
                                key={project.id}
                                className={styles.resultItem}
                                onClick={() => handleSelect(project.id)}
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className={styles.resultThumb}
                                />
                                <div className={styles.resultInfo}>
                                    <span className={styles.resultTitle}>{project.title}</span>
                                    <span className={styles.resultMeta}>
                                        {project.category} • ${project.price}
                                    </span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className={styles.noResults}>No projects found</div>
                    )}
                </div>
            )}
        </div>
    )
}
