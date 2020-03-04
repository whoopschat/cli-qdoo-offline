#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const program = minimist(process.argv.slice(2), []);
const { formatDate } = require('./_func');
const { mkdirsSync, existsSync } = require('./_fst');
const { offline } = require('./_offline');
const { publish } = require('./_publish');
const { upload } = require('./_upload');

let config = {};
let configPath = path.posix.join(process.cwd(), program.config || './qdoo-offline-config.json');
if (fs.existsSync(configPath)) {
    Object.assign(config, require(configPath))
}

if (program.help) {
    console.log("");
    console.log("Usage: cli-qdoo-offline [options]");
    console.log("  --src                 src dir");
    console.log("  --config              config file, def: ./qdoo-offline-config.json");
    console.log("  --upload              upload to oss");
    console.log("  --publish             upload to oss and publish");
    console.log("  --debug               enable debug");
    console.log("  --all                 un filter .js.map file");
    console.log("  --help                show help");
    console.log("");
    return;
}


if (!program.src) {
    console.log('');
    console.log("失败 - " + chalk.red("无效的资源目录"));
    console.log('');
    return false;
}

let cacheDir = path.join(process.cwd(), '/.offline/');
mkdirsSync(cacheDir);

let srcPath = path.posix.join(process.cwd(), program.src);
if (!existsSync(srcPath)) {
    console.log('');
    console.log("失败 - " + chalk.red("无效的资源目录:" + srcPath));
    console.log('');
    return false;
}

console.log('');
console.log(chalk.yellow('开始构建离线包 ...\n'));
// 最新版本号
let version = formatDate(Date.now(), "yyyyMMddHHmmss");
// 打包离线包
offline(srcPath, cacheDir, program.all).then((file) => {
    if (program.upload || program.publish) {
        return upload(file, version, config.oss)
    }
    return file;
}).then(url => {
    if (program.publish) {
        return publish(url, version, config.app, program.debug);
    }
    return url;
}).then((res) => {
    console.log('');
    console.log("成功 - " + chalk.green(JSON.stringify(res)));
    console.log('');
}).catch(err => {
    console.log('');
    let errmsg = "";
    if (err instanceof Error) {
        errmsg = err.stack;
    } else if (typeof err === 'object') {
        errmsg = JSON.stringify(err);
    } else {
        errmsg = err;
    }
    console.log("失败 - " + chalk.red(errmsg));
    console.log('');
});