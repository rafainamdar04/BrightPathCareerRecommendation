// Quick check if .env is being loaded
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('📁 Checking .env file...')
try {
  const envPath = join(__dirname, '.env')
  const content = readFileSync(envPath, 'utf-8')
  console.log('✅ .env file exists:')
  console.log(content)
} catch (err) {
  console.error('❌ .env file not found or not readable:', err.message)
}
