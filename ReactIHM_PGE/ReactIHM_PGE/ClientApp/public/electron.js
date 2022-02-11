const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

let mainWindow = null;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 1024,
        title: "SAURON",
        icon: "./logoDBRIF.ico",
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.on('page-title-updated', function (e) {
        e.preventDefault()
    });
}

/*
// ------------------- set up event listeners here --------------------

// temporary variable to store data while background
// process is ready to start processing
let cache = {
    data: undefined,
};

// a window object outside the function scope prevents
// the object from being garbage collected
let hiddenWindow;

// This event listener will listen for request
// from visible renderer process
ipcMain.on('START_BACKGROUND_VIA_MAIN', (event, args) => {
    const backgroundFileUrl = url.format({
        pathname: path.join(__dirname, `../background_tasks/background.html`),
        protocol: 'file:',
        slashes: true,
    });
    hiddenWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    hiddenWindow.loadURL(backgroundFileUrl);

    hiddenWindow.webContents.openDevTools();

    hiddenWindow.on('closed', () => {
        hiddenWindow = null;
    });

    cache.data = args.number;
});

// This event listener will listen for data being sent back
// from the background renderer process
ipcMain.on('MESSAGE_FROM_BACKGROUND', (event, args) => {
    mainWindow.webContents.send('MESSAGE_FROM_BACKGROUND_VIA_MAIN', args.message);
});

ipcMain.on('BACKGROUND_READY', (event, args) => {

    event.reply('START_PROCESSING', {
        data: cache.data,
    });
});*/