#!/usr/bin/env node
/**
 * Convert public/images JPG/PNG → WebP for Core Web Vitals.
 * Skips if sharp is unavailable.
 */
import { readdirSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const imgDir = join(__dirname, '..', 'public', 'images')

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('sharp not installed — skip WebP generation (npm i -D sharp)')
    return
  }

  const files = readdirSync(imgDir).filter((f) => /\.(jpe?g|png)$/i.test(f))
  let count = 0
  for (const file of files) {
    const input = join(imgDir, file)
    if (!statSync(input).isFile()) continue
    const out = join(imgDir, `${basename(file, extname(file))}.webp`)
    try {
      await sharp(input)
        .webp({ quality: 78, effort: 4 })
        .toFile(out)
      count++
    } catch (err) {
      console.warn(`skip ${file}:`, err.message)
    }
  }
  console.log(`WebP generated: ${count} files`)
}

main()
