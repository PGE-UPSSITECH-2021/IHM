const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

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
    })); mainWindow.on('closed', function () {
        mainWindow = null
    })
    mainWindow.on('page-title-updated', function (e) {
        e.preventDefault()
    });
    /*var python = require('child_process').spawn('python', ['../src/python/specificResults.py']);
    python.stdout.on('data', function (data) {
        console.log("data: ", data.toString('utf8'));
    });*/

}

