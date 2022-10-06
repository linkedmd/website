import Head from 'next/head'
import Image from 'next/image'
import {
  LinkedMarkdownViewer,
  LinkedMarkdownEditor,
} from '@linkedmd/components'

import React, { useState } from 'react'

export default function Home() {
  const startFileURI =
    'https://raw.githubusercontent.com/linkedmd/website/main/public/LinkedMarkdown.linked.md'

  const [edit, setEdit] = useState(false)
  const [fileURI, setFileURI] = useState(startFileURI)

  return (
    <>
      <Head>
        <title>Linked Markdown</title>
        <meta
          name="description"
          content="A superset of Markdown that provides support for declaring variables, referencing them and importing them from remote sources."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1>⍈</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Linked Markdown</div>

          <div style={{ textAlign: 'right' }}>
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
          </div>
        </div>
      </div>

      {edit ? (
        <div style={{ margin: 'auto' }}>
          <LinkedMarkdownEditor fileURI={fileURI} />
        </div>
      ) : (
        <div style={{ maxWidth: '768px', margin: 'auto' }}>
          <LinkedMarkdownViewer
            fileURI={fileURI}
            onFileURIChange={(newFileURI) => setFileURI(newFileURI)}
          />
        </div>
      )}
    </>
  )
}
