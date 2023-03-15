const fs = require('fs');

let filePath = process.argv[2];
function cat(filePath) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if (error) {
            console.log('Error: ENOENT: no such file or directory, open ', process.argv[2])
            process.exit(1)
        } else {
            console.log(data)
        }
})
}