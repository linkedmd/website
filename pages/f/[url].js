import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const LinkedMarkdownViewer = dynamic(
  () => import('@linkedmd/components').then((mod) => mod.LinkedMarkdownViewer),
  {
    ssr: false,
  }
)

export default function View() {
  const router = useRouter()
  const { url } = router.query

  return (
    <>
      <LinkedMarkdownViewer fileURI={url} />
    </>
  )
}
