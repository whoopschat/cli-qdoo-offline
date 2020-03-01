const alioss = require('ali-oss');
const fs = require('fs');

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

function upload(file, version, oss) {
    return new Promise((resolve, reject) => {
        let fileStat = fs.statSync(file);
        if (!fileStat.isFile()) {
            reject(`[QDOO] 无效的离线包: ${file}`);
            return;
        }
        if (!oss || !oss.accessKeyId || !oss.accessKeySecret) {
            reject(`[QDOO] 无效的OSS配置`, oss);
            return;
        }
        console.log(`[QDOO] 开始上传离线包到OSS ...【${_size(fileStat.size)}】`)
        const client = new alioss(oss);
        let http = "http://";
        if (oss.https) {
            http = "https://"
        }
        let relative = `${version}.zip`;
        if (!oss.domain) {
            oss.domain = `${oss.bucket}.${oss.region}.aliyuncs.com`;
        }

        client.put(`${oss.path}${relative}`, file).then(() => {
            let url = `${http}${oss.domain}${oss.path}${relative}`;
            console.log(`[QDOO] 文件上传成功【 ${url} 】 ✔`)
            resolve(url);
        }).catch(() => {
            reject(`[QDOO] 离线包上传失败: ${file}`);
        });
    })
}

module.exports = exports = {
    upload
}