import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Script from 'next/script'
import keccak256 from 'keccak256'

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

  const [fileURL, setFileURL] = useState(u)
  const [fileHash, setFileHash] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader()
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: 'text/markdown' })
      setFileHash(keccak256(reader.result).toString('hex'))
      setFileURL(URL.createObjectURL(blob))
    }
    reader.readAsText(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <main {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && (
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
              color: 'black',
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
          {!fileHash && <Script src="https://hypothes.is/embed.js" />}
          <LinkedMarkdownViewer
            fileURI={fileURL}
            onFileURIChange={() => {
              const h1 = document.getElementsByTagName('h1')[0]
              if (h1) document.title = h1.innerText
            }}
          />
          {fileHash && (
            <>
              <hr />
              <i>File hash (Keccak256): {fileHash}</i>
            </>
          )}
        </div>
      )}
    </main>
  )
}
