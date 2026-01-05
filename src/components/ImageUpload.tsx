'use client'

import { useState, useRef, useCallback } from 'react'
import styles from './ImageUpload.module.css'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label?: string
}

export default function ImageUpload({ value, onChange, label = 'Project Image' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (file: File) => {
        setUploading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Upload failed')
            }

            onChange(data.imageUrl)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleUpload(file)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/')) {
            handleUpload(file)
        } else {
            setError('Please drop an image file')
        }
    }, [])

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleRemove = () => {
        onChange('')
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className={styles.container}>
            <label className="form-label">{label} *</label>

            {value ? (
                <div className={styles.preview}>
                    <img src={value} alt="Preview" className={styles.previewImage} />
                    <div className={styles.previewOverlay}>
                        <button
                            type="button"
                            onClick={handleClick}
                            className={styles.changeBtn}
                        >
                            Change
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className={styles.removeBtn}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`${styles.dropzone} ${dragActive ? styles.active : ''} ${uploading ? styles.uploading : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    {uploading ? (
                        <div className={styles.uploadingContent}>
                            <div className="spinner" />
                            <span>Uploading...</span>
                        </div>
                    ) : (
                        <div className={styles.dropzoneContent}>
                            <div className={styles.icon}>📷</div>
                            <p className={styles.dropText}>
                                Drag and drop an image here, or click to browse
                            </p>
                            <span className={styles.hint}>
                                JPEG, PNG, WebP, or GIF (max 5MB)
                            </span>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className={styles.hiddenInput}
            />

            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
