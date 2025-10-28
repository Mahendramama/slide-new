import { useState } from 'react'


<section className="bg-white rounded-2xl shadow p-4 mb-6">
<label className="block text-sm font-medium text-slate-700 mb-2">News links</label>
<textarea
className="w-full rounded-xl border border-slate-200 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[120px]"
placeholder={sample}
value={urls}
onChange={(e) => setUrls(e.target.value)}
/>
<div className="mt-3 flex items-center gap-3">
<button
onClick={handleGenerate}
disabled={loading}
className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 hover:bg-brand-700 disabled:opacity-50"
>
{loading ? 'Working…' : 'Generate slides'}
</button>
{error && <span className="text-red-600 text-sm">{error}</span>}
</div>
<p className="text-xs text-slate-500 mt-2">Note: Translation uses LibreTranslate by default. You can self‑host for reliability, see README below.</p>
</section>


<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
{slides.map((s, i) => (
<div key={i} className="bg-white rounded-2xl shadow p-4">
<div className="flex items-center justify-between mb-2">
<h2 className="text-lg font-semibold text-slate-800 truncate pr-3" title={s.title}>{s.title || 'Slide'}</h2>
<a className="text-brand-600 text-sm underline" href={s.url} target="_blank" rel="noreferrer">Source</a>
</div>
<p className="text-xs text-slate-500 mb-3">Detected: {s.lang_detected} • Translated: {String(s.translated)} • Words: {s.summary_words_count}</p>
<SlideCanvas
width={1280}
height={720}
title={s.title}
summary={s.summary_odia}
imageUrl={s.imageUrl}
textRatio={0.6}
/>
</div>
))}
</section>


{!slides.length && (
<footer className="text-xs text-slate-500 mt-8">
Tip: You can queue multiple URLs and download the PNGs one by one.
</footer>
)}
</div>
)
}
