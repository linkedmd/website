export default async function handler(req, res) {
  const file = await fetch(
    `https://raw.githubusercontent.com/${req.query.path}`
  )
  res.status(200).send(await file.text())
}
