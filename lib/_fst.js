const fs = require('fs');
const path = require('path');
const func = require('./_func');

function mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
    return false;
}

function listSync(src) {
    let entrysList = [];
    const fetchFile = (file) => {
        if (!fs.existsSync(file)) {
            return;
        }
        let fileStat = fs.statSync(file);
        if (fileStat.isDirectory()) {
            const fileList = fs.readdirSync(file);
            if (!fileList.length) {
                return;
            }
            fileList.forEach(item => {
                fetchFile(path.join(file, `./${item}`))
            })
        } else {
            entrysList.push(path.relative(src, file));
        }
    }
    fetchFile(src);
    return entrysList;
}

function copySync(src, dst, filter, map, options) {
    mkdirsSync(dst);
    let content = null;
    if (filter && filter(src)) {
        content = fs.readFileSync(src, 'utf-8');
        Object.keys(options).forEach(key => {
            if (key != options[key]) {
                content = func.stringReplaceAll(content, key, options[key]);
            }
        });
    } else {
        content = fs.readFileSync(src);
    }
    if (map) {
        dst = map(dst);
    }
    fs.writeFileSync(dst, content);
}

function copyDirSync(src, dst, filter, map, options) {
    if (emptySync(src)) {
        return;
    }
    mkdirsSync(dst);
    listSync(src).forEach(file => {
        copySync(path.join(src, file), path.join(dst, file), filter, map, options);
    })
}

function existsSync(file) {
    return fs.existsSync(file);
}

function emptySync(dir) {
    if (!fs.existsSync(dir)) {
        return true;
    }
    let fileStat = fs.statSync(dir);
    if (fileStat.isDirectory()) {
        const fileList = fs.readdirSync(dir);
        if (!fileList.length) {
            return true;
        }
    }
    return false;
}

module.exports = exports = {
    emptySync,
    existsSync,
    copyDirSync,
    mkdirsSync,
    listSync,
}