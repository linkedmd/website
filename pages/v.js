import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

const LinkedMarkdownViewer = dynamic(
  () => import('@linkedmd/components').then((mod) => mod.LinkedMarkdownViewer),
  {
    ssr: false,
  }
)

export default function View() {
  const router = useRouter()
  const { u } = router.query
  useEffect(() => setFileURL(u), [u])

  const drag = useRef(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [fileURL, setFileURL] = useState(u)

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const blob = new Blob([e.target.result], { type: 'text/markdown' })
        setFileURL(URL.createObjectURL(blob))
      }
      reader.readAsText(file)
    }
  }, [file])

  return (
    <main
      ref={drag}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setFile(e.dataTransfer.files[0])
        setDragging(false)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDragEnter={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target !== drag.current) {
          setDragging(true)
        }
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (
          !e.currentTarget.contains(e.relatedTarget) ||
          e.target === drag.current
        )
          setDragging(false)
      }}
    >
      {dragging && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255,255,255,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
            }}
          >
            <h1>Drop file to view</h1>
          </div>
        </div>
      )}
      {fileURL && (
        <div>
          {!file && <Script src="https://hypothes.is/embed.js" />}
          <LinkedMarkdownViewer
            fileURI={fileURL}
            onFileURIChange={() => {
              const h1 = document.getElementsByTagName('h1')[0]
              if (h1) document.title = h1.innerText
            }}
          />
        </div>
      )}
    </main>
  )
}
