export default async function handler(req, res) {
  const path = req.query.path.join('/')
  const file = await fetch(`https://raw.githubusercontent.com/${path}`)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'text/markdown')
  res.status(200).send(await file.text())
}
