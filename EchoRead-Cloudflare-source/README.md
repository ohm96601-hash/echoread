# EchoRead V1.1
Mobile-first English reading and recording PWA. Next.js App Router, TypeScript, Tailwind, Dexie, Tesseract.js. No account or paid speech service required.

## Run
Node 22+, `npm install`, `npm run dev`. Localhost is a secure context for local microphone development. Phone access requires HTTPS.
`npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.

## Deployment
`next build` creates a static export; `scripts/package.mjs` embeds those assets into a Cloudflare Worker at dist/server/index.js for Sites. Worker fetch serves assets and /api/translate. This is an explicit deployment adaptation: translation is a Worker route, rather than a Next.js API Route (static export cannot run API Routes). Next.js App Router is used for the client app. Optional translation settings are server-only Worker environment variables in .env.example. No translation provider is configured by default. Vercel migration requires moving the same handler into an App Router API Route and removing output:export.

## Database
IndexedDB EchoRead v1: articles (id, updatedAt); sentences (id, articleId, [articleId+order]); preferences (id); words (id, word). Schema types in lib/db.ts. Stable IDs preserve progress. Sentence edits reset translation and practiced status; split creates new IDs, merge removes obsolete sentence. Recordings live only in memory and never in IndexedDB or backup.

## Implemented
Text paste/edit, local OCR with progress and review, robust sentence segmentation, sentence edit/split/merge, vertical inline practice cards, browser TTS/repeats/rate/accent, microphone permission and MIME negotiation, recording/playback/re-recording, local practiced status, article search/rename/delete, translation batching/cache/failure states, English dictionary with authentic definitions, word/sentence favorites, JSON backup/import with validation and explicit duplicate replacement, PWA manifest/icons/static caching, safe areas and offline saved reading.

## Limits / deferred
Azure TTS and pronunciation scoring are not implemented (provider extension reserved and disabled). Chinese vocabulary definitions are not configured; the free dictionary provides English definitions/phonetics when available. No fabricated definitions. Translation requires a configured server key and can incur provider charges; default sends no provider requests. OCR initially downloads worker/language files and needs internet; OCR offline is not guaranteed. Native voice choice is device-dependent; exact audio timing and dependable pause/resume are intentionally omitted. Settings pause is available in Settings. No registration/cloud sync. Worker rate limiting is best-effort per isolate. Batch translation errors can be retried manually; no hidden retries/costs. Favorite-sentence filtering remains deferred.

## iOS Safari / PWA checklist (physical-device checks pending)
- [ ] Safari 375/390/393/430px, no horizontal overflow, safe-area bottom controls
- [ ] Paste 500+ words; camera/image OCR progress; edit and save
- [ ] Voices load asynchronously; tap play; repeat/rate/accent available on device
- [ ] Microphone allow/deny/retry; real record-stop-replay and re-record
- [ ] Rapid sentence changes and background/foreground: no simultaneous audio
- [ ] Home screen install, standalone launch, offline reading after first online load
- [ ] Refresh retains article/translation/progress but drops recordings
- [ ] Export/reimport valid backup; malformed JSON rejected; duplicate replacement
- [ ] Keyboard leaves textarea and save reachable by sheet scroll

Do not treat desktop browser checks as physical iPhone verification. Safari storage can be evicted; back up regularly. PWA private hosting may require sign-in when reconnecting. Offline speech depends on downloaded system voices. Recording stops on background and tracks are released; playback URLs survive only until reload/close. Recordings are never network-request payloads.
