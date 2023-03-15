const fs = require('fs');

filePath = process.argv[2];
fs.readFile(filePath, 'utf8', function(error, data) {
    if (error) {
        console.log('Error: ENOENT: no such file or directory, open ', process.argv[2])
        process.kill(1)
    } else {
        console.log(data)
    }
})
