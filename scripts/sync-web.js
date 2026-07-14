// src/index.html（本体）をルートの index.html（Web公開用）へコピーする。
// ルートの index.html は直接編集しないこと — 必ず src/index.html を編集してから
// `npm run sync:web` を実行する（build:win / build:mac 実行時は自動で走る）。
const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '..', 'src', 'index.html')
const dest = path.join(__dirname, '..', 'index.html')

const banner = '<!-- 自動生成ファイル: 直接編集しないでください。編集は src/index.html を修正し `npm run sync:web` を実行してください。 -->\n'
const body = fs.readFileSync(src, 'utf8')

fs.writeFileSync(dest, banner + body)
console.log(`sync:web — ${path.relative(process.cwd(), src)} → ${path.relative(process.cwd(), dest)}`)

// src/vendor/（xlsx等のベンダースクリプト）をリポジトリルートの vendor/ にもコピーする。
// ルート index.html（Web公開用）からの相対パス `vendor/...` を解決するため。
const vendorSrc = path.join(__dirname, '..', 'src', 'vendor')
const vendorDest = path.join(__dirname, '..', 'vendor')
if (fs.existsSync(vendorSrc)) {
  fs.cpSync(vendorSrc, vendorDest, { recursive: true })
  console.log(`sync:web — ${path.relative(process.cwd(), vendorSrc)} → ${path.relative(process.cwd(), vendorDest)}`)
}
