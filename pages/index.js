import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  LinkedMarkdownViewer,
  LinkedMarkdownEditor,
} from '@linkedmd/components'
import '@linkedmd/components/dist/index.css'
import React, { useState } from 'react'

export default function Home() {
  const startFileURI =
    'https://raw.githubusercontent.com/linkedmd/linkedmd/main/parser/examples/DomainAgreement.linked.md'

  const [edit, setEdit] = useState(false)
  const [fileURI, setFileURI] = useState(startFileURI)

  return (
    <>
      <div style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1>⍈</h1>
        <div></div>
      </div>
      <h3 style={{ textAlign: 'center' }}>
        <a
          onClick={() => {
            setEdit(false)
          }}
          style={{ cursor: 'pointer' }}
        >
          View
        </a>{' '}
        |{' '}
        <a
          onClick={() => {
            setEdit(true)
          }}
          style={{ cursor: 'pointer' }}
        >
          Edit
        </a>
      </h3>
      {edit ? (
        <div style={{ maxWidth: '1280px', margin: 'auto' }}>
          <LinkedMarkdownEditor fileURI={startFileURI} />
        </div>
      ) : (
        <div style={{ maxWidth: '768px', margin: 'auto' }}>
          <LinkedMarkdownViewer
            fileURI={fileURI}
            onFileURIChange={(newFileURI) => {
              setFileURI(newFileURI)
            }}
          />
        </div>
      )}
    </>
  )
}
