let { PythonShell } = require('python-shell')
var path = require("path")
const electron = require('electron');
const { app } = electron;
/*var options = {
    scriptPath: path.join(__dirname, '/'),
}*/
//console.log(__dirname);
//console.log(app.getAppPath());
let pyshell = new PythonShell('../../../../Documents/UPSSITECH/3A/PGE/IHM/IHM/ReactIHM_PGE/ReactIHM_PGE/ClientApp/src/python/result.py');
PythonShell.run('../../../../Documents/UPSSITECH/3A/PGE/IHM/IHM/ReactIHM_PGE/ReactIHM_PGE/ClientApp/src/python/result.py', null, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: aaaaaaaaaaaaaaaaaah ');

});

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

pyshell.stdout.on("data", function (data) {
    // Do some process here
});

pyshell.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    console.log(`stderr: ${data}`);
});


// end the input stream and allow the process to exit
pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
});

const fs = require('browserify-fs');
function readFile(fileURL, mimeType) {
    const pathToFile = fileURL.replace("file:\\", '');
    console.log(pathToFile);
    console.log(__dirname);
    console.log(__filename);
    fs.readFile(pathToFile, mimeType, (err, contents) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(contents);
    })
}

readFile("C:/Users/AnaisM/Documents/UPSSITECH/3A/PGE/IHM/IHM/ReactIHM_PGE/ReactIHM_PGE/ClientApp/src/data/files_results_history.json", 'utf8');
