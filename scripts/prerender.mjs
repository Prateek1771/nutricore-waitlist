import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

async function prerender() {
  const { render } = await import('../dist/server/entry-server.js')
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  const routes = ['/', '/survey']

  for (const url of routes) {
    const appHtml = render(url)
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const filePath = path.resolve(distDir, url === '/' ? 'index.html' : `${url.slice(1)}/index.html`)
    const dir = path.dirname(filePath)
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(filePath, html)
    console.log(`✓ Prerendered dist${url === '/' ? '/index.html' : `${url}/index.html`}`)
  }
}

prerender().catch((err) => { console.error(err); process.exit(1) })
