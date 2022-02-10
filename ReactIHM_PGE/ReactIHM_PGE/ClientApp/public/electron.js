const electron = require('electron');
const { app, BrowserWindow, protocol } = electron;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const fs = require('fs');

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
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }

    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',    
        slashes: true
    }));
    fs.readFile('C:\\Users\\AnaisM\\Documents\\UPSSITECH\\3A\\PGE\\IHM\\IHM\\ReactIHM_PGE\\ReactIHM_PGE\\ClientApp\\src\\data\\files_results_history.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.on('page-title-updated', function (e) {
        e.preventDefault()
    });
}
