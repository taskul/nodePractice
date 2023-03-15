const axios = require('axios');
const fs = require('fs');

let filePath = process.argv[2];

if (filePath.startsWith('http')) {
    webCat(filePath);
} else {
    cat(filePath)
}

async function webCat(filePath) {
    const response = await axios.get(filePath)
    .catch(function(err) {
        if (err.response) {
            console.log('Error: Request failed with status code: ', err.response.status)
            process.exit(1)
        }
    })
    console.log(response.data);
}

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
