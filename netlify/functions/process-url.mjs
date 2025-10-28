// Netlify Function: Fetch article -> extract main text + image -> summarize to ~30 words -> translate to Odia


function textFallback(doc) {
const sel = doc.querySelector('article') || doc.querySelector('main') || doc.body
return sel.textContent.replace(/\s+/g, ' ').trim()
}


function sentences(str) {
return (str || '')
.replace(/\s+/g, ' ')
.split(/(?<=[\.!?\u0964\u0965])\s+/u) // includes Devanagari danda as a weak heuristic
.map(s => s.trim())
.filter(Boolean)
}


function summarizeToWords(text, wordLimit = 30) {
// Minimal extractive heuristic: take up to first 3 informative sentences, then trim to wordLimit.
const sents = sentences(text).slice(0, 5)
const joined = sents.join(' ')
return trimToWords(joined, wordLimit)
}


function trimToWords(text, n) {
const tokens = (text || '').split(/\s+/).filter(Boolean)
return tokens.slice(0, n).join(' ')
}


function countWords(text) {
return (text || '').split(/\s+/).filter(Boolean).length
}


function detectLang(text) {
// Lightweight heuristic to avoid heavy deps: check Latin vs Odia script.
// Odia block: U+0B00–U+0B7F
const hasOdia = /[\u0B00-\u0B7F]/.test(text)
if (hasOdia) return 'ori' // ISO-639-3 for Odia
const hasLatin = /[A-Za-z]/.test(text)
if (hasLatin) return 'eng'
return 'und'
}


function langToIso1(code3) {
if (code3 === 'eng') return 'en'
if (code3 === 'ori') return 'or'
return 'auto'
}


async function translateViaLibre(text, source = 'auto', target = 'or') {
const url = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate'
const apiKey = process.env.LIBRETRANSLATE_API_KEY
const res = await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ q: text, source, target, format: 'text', api_key: apiKey || undefined })
})
if (!res.ok) throw new Error('Translation failed')
const data = await res.json()
// LibreTranslate returns { translatedText }
return data.translatedText || text
}
