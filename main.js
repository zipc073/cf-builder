const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 780,
    minWidth: 760,
    minHeight: 560,
    title: 'CF Builder — キャッシュフロー計算書作成ツール',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#F7F5F0',
    show: false,
  })

  win.loadFile(path.join(__dirname, 'src', 'index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  // メニューバーを最小化（日本語アプリ向け）
  win.setMenuBarVisibility(false)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
