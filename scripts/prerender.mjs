import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

async function prerender() {
  const { render } = await import('../dist/server/entry-server.js')
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')
  const appHtml = render()
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  fs.writeFileSync(path.resolve(distDir, 'index.html'), html)
  console.log('✓ Prerendered dist/index.html')
}

prerender().catch((err) => { console.error(err); process.exit(1) })
