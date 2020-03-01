const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function unlink(file) {
    try {
        fs.unlinkSync(file);
    } catch (error) {
    }
}

function offline(dir, dest) {
    return new Promise((resolve, reject) => {
        console.log(`[QDOO] 开始打包离线包 ...`)
        let zipFile = path.join(dest, 'package.zip');
        unlink(zipFile);
        let archive = archiver('zip');
        archive.directory(dir, false);
        let output = fs.createWriteStream(zipFile);
        output.on('close', function () {
            console.log(`[QDOO] 离线包生成成功: ${zipFile}`)
            resolve(zipFile);
        })
        output.on('error', function (err) {
            reject(err);
        })
        archive.pipe(output);
        archive.finalize();
    })
}

module.exports = exports = {
    offline
}