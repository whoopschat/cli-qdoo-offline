const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { listSync } = require('./_fst');

function unlink(file) {
    try {
        fs.unlinkSync(file);
    } catch (error) {
    }
}

function _size(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);
    return size + unitArr[index];
}

function offline(dir, dest, all) {
    return new Promise((resolve, reject) => {
        console.log(`[QDOO] 开始打包离线包 ...`)
        let zipFile = path.join(dest, 'package.zip');
        unlink(zipFile);
        let list = listSync(dir);
        if (!all) {
            list = list.filter((item) => {
                if (item.indexOf(".js.map") >= 0) {
                    return false;
                }
                return true;
            })
        }
        if (list.length <= 0) {
            reject("资源文件为空");
            return;
        }
        let archive = archiver('zip');
        let output = fs.createWriteStream(zipFile);
        list.forEach(item => {
            let filepath = path.posix.join(dir, item);
            console.log("[QDOO] 压缩文件：", filepath);
            archive.file(filepath, { name: item })
        });
        output.on('close', function () {
            let fileStat = fs.statSync(zipFile);
            if (!fileStat.isFile()) {
                reject(`无效的离线包: ${zipFile}`);
                return;
            }
            console.log(`[QDOO] 离线包生成成功: ${zipFile} -【${_size(fileStat.size)}】✔ `)
            resolve(zipFile);
        });
        output.on('error', function (err) {
            reject(err);
        });
        archive.pipe(output);
        archive.finalize();
    })
}

module.exports = exports = {
    offline
}