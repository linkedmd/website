import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LinkedMarkdownViewer = dynamic(
  () => import('@linkedmd/components').then((mod) => mod.LinkedMarkdownViewer),
  {
    ssr: false,
  }
)

export default function View() {
  const router = useRouter()
  const { u } = router.query

  return (
    <>
      {u && (
        <div style={{ maxWidth: '768px', margin: 'auto' }}>
          <LinkedMarkdownViewer fileURI={u} />
        </div>
      )}
    </>
  )
}
