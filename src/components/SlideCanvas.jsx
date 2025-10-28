import { useEffect, useRef, useState } from 'react'
const sw = Math.floor(imgW / ratio)
const sh = Math.floor(height / ratio)
const sx = Math.floor((img.width - sw) / 2)
const sy = Math.floor((img.height - sh) / 2)
ctx.drawImage(img, sx, sy, sw, sh, textW, 0, imgW, height)
drawText()
setPngUrl(canvas.toDataURL('image/png'))
}
img.onerror = () => {
drawText()
setPngUrl(canvas.toDataURL('image/png'))
}
img.src = imageUrl || ''


function drawText() {
const pad = 48
const colX = pad
const colY = pad
const colW = textW - pad * 2


// Title
ctx.fillStyle = 'white'
ctx.font = `700 52px var(--odia-font)`
ctx.textBaseline = 'top'
const titleLines = wrapText(ctx, title || '', colX, colY, colW, 60)
titleLines.forEach(line => ctx.fillText(line.text, line.x, line.y))


// Summary
const summaryTop = colY + Math.min(titleLines.length, 2) * 60 + 20
ctx.font = `500 40px var(--odia-font)`
const summaryLines = wrapText(ctx, summary || '', colX, summaryTop, colW, 52)
// keep summary balanced on the column height
const maxLines = Math.floor((height - summaryTop - pad) / 52)
summaryLines.slice(0, maxLines).forEach(line => ctx.fillText(line.text, line.x, line.y))


// Footer tag
ctx.font = `400 24px var(--odia-font)`
ctx.fillStyle = 'rgba(255,255,255,0.9)'
ctx.fillText('ସାରାଂଶ • Odia Summary', colX, height - pad - 28)
}
}, [width, height, title, summary, imageUrl, textRatio])


const download = () => {
const a = document.createElement('a')
a.href = pngUrl
a.download = (title ? title.slice(0, 40).replace(/[^\p{L}\p{N}\-_\s]/gu, '').trim() : 'slide') + '.png'
a.click()
}


return (
<div>
<canvas ref={canvasRef} width={width} height={height} className="w-full rounded-xl shadow" />
<div className="mt-3 flex gap-3">
<button onClick={download} className="rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-slate-800">Download PNG</button>
<span className="text-xs text-slate-500 self-center">Text area ≈ {Math.round(textRatio*100)}%, image ≈ {Math.round((1-textRatio)*100)}%</span>
</div>
</div>
)
}
