function sendToPython() {
    var python = require('child_process').spawn('python', ['./python/result.py']);
    python.stdout.on('data', function (data) {
        console.log("Python response");
       
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

}

sendToPython();


