import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
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

  return (
    <main>
      {u && (
        <div>
          <Script src="https://hypothes.is/embed.js" />
          <LinkedMarkdownViewer fileURI={u} />
        </div>
      )}
    </main>
  )
}
