import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import geoLocationRouter from './src/backend/routes/geoLocation.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

// API Routes
app.use('/api/location', geoLocationRouter)

// Serve React build files
app.use(express.static(path.join(__dirname, 'build')))

// Fallback to React for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})