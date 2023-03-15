const axios = require('axios');
const fs = require('fs');

let filePath = process.argv[2];

if (filePath.startsWith('--out')) {
    const contentToWrite = process.argv[3];
    const contentToRead = process.argv[4];
    createNewFile(contentToWrite, contentToRead);
}
else if (filePath.startsWith('http')) {
    webCat(filePath);
} else {
    cat(filePath)
}


async function webCat(filePath) {
    const response = await axios.get(filePath)
    .catch(function(err) {
        if (err.response) {
            console.log('Error: Request failed with status code: ', err.response.status)
            process.kill(1)
        }
    })
    console.log(response.data)
    return response.data;
}

function cat(filePath) {
    fs.readFile(filePath, 'utf8', function(error, data) {
        if (error) {
            console.log('Error: ENOENT: no such file or directory, open ', process.argv[2])
            process.kill(1)
        } else {
            console.log(data)
            return data;
        }
    })
    
}

async function createNewFile(contentToWrite, contentToRead) {
    let contents;
    if (contentToRead.startsWith('http')) {
        contents = await webCat(contentToRead);
    } else {
        contents = cat(contentToRead);
    };
    fs.writeFile(contentToWrite, contents,'utf8', (error) => {
        if (error) {
            console.log('ERROR: while writing to file ', error);
            process.kill(1);
        }
    })
    console.log(`no output, but ${contentToWrite} contains contents of ${contentToRead}`);
}
