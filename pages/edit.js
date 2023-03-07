import Head from 'next/head'
import dynamic from 'next/dynamic'

const LinkedMarkdownEditor = dynamic(
  () => import('@linkedmd/components').then((mod) => mod.LinkedMarkdownEditor),
  {
    ssr: false,
  }
)

export default function Home() {
  const startFileURI =
    'https://raw.githubusercontent.com/linkedmd/website/main/public/LinkedMarkdown.linked.md'

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
      <div
        style={{
          position: 'fixed',
          left: 16,
          right: 16,
          bottom: 16,
          top: 16,
          overflowY: 'scroll',
        }}
      >
        <LinkedMarkdownEditor fileURI={startFileURI} />
      </div>
    </>
  )
}
