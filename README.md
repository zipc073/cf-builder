# CF Builder — ビルド手順

## 概要
このフォルダをビルドすると、Windows用ポータブルexe（`CF-Builder-Portable.exe`）が生成されます。
ユーザー側にはNode.js等のインストールは不要です。

---

## ビルド環境の準備（開発者側のみ・初回1回だけ）

### 1. Node.js をインストール
https://nodejs.org/ja/ から **LTS版** をダウンロードしてインストール。

インストール確認:
```
node -v
npm -v
```

### 2. このフォルダに移動
```
cd cf-builder
```

### 3. 依存パッケージをインストール
```
npm install
```
（初回は数分かかります）

---

## ビルド実行

```
npm run build:win
```

完了すると `dist/` フォルダに以下が生成されます:
```
dist/
  CF-Builder-Portable.exe   ← これをユーザーに配布するファイル
```

---

## ユーザーへの配布方法

`CF-Builder-Portable.exe` を渡すだけです。

ユーザーの操作手順:
1. `CF-Builder-Portable.exe` をダブルクリック
2. 「このアプリをこのデバイスで実行することを許可しますか？」→ 「はい」
3. そのまま起動（インストール不要）

---

## 開発中の動作確認

ビルドせずにすぐ起動して確認したい場合:
```
npm start
```

---

## ファイル構成

```
cf-builder/
├── main.js          # Electronのメインプロセス（ウィンドウ制御）
├── package.json     # ビルド設定
├── src/
│   └── index.html   # アプリ本体（CF計算ツールのUI）※編集はここだけ
├── index.html        # Web公開用コピー（自動生成・直接編集しない）
├── scripts/
│   └── sync-web.js  # src/index.html → index.html への同期スクリプト
└── assets/
    ├── icon.png     # アプリアイコン（PNG）
    └── icon.ico     # アプリアイコン（Windows用・任意）
```

### 本体とWeb公開用ファイルの同期について

アプリのUI/ロジックは **`src/index.html` が唯一の編集対象**です。
ルート直下の `index.html`（https://cf-builder.manabu.club/ にデプロイされるファイル）は
`src/index.html` から自動生成されるコピーなので、直接編集しないでください。

`src/index.html` を編集したら、以下のいずれかで同期します。

```
npm run sync:web
```

`npm run build:win` / `npm run build:mac` を実行すると、ビルド前に自動で `sync:web` が走ります。
同期後、変更されたルートの `index.html` をコミット・デプロイしてください。

---

## アイコンをカスタマイズしたい場合

`assets/icon.ico` に 256x256 の .ico ファイルを置くと、
exeファイルとウィンドウのアイコンが変わります。

無料の変換ツール: https://convertico.com/

---

## トラブルシューティング

| 問題 | 対処 |
|---|---|
| `npm install` でエラー | Node.jsのバージョンを18以上に更新 |
| ビルドが途中で止まる | `node_modules` を削除して `npm install` を再実行 |
| exeを起動してもウィンドウが出ない | `npm start` で動作確認し、エラーメッセージを確認 |
