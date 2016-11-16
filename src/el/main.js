import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';
import bunyan from 'bunyan';
import ffi from 'ffi';
import axios from 'axios';

const log = bunyan.createLogger({ name: 'build-with-native-modules' });

let win;

function createWindow() {
  win = new BrowserWindow({ width: 600, height: 800 });

  win.loadURL(url.format({
    pathname: path.resolve(__dirname, '../ui/index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  ipcMain.on('trigger-clicked', (event, msg) => {
    log.info(`trigger confirmation from electron: ${msg}`);
  });
}

app.on('ready', createWindow);

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
