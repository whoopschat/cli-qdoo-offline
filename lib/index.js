#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const program = minimist(process.argv.slice(2), []);
const { mkdirsSync } = require('./_fst');
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
    console.log("");
    console.log("Usage: cli-qdoo-offline [options]");
    console.log("  --src                src path");
    console.log("  --config             config file def: ./qdoo-offline-config.json");
    console.log("  --help               show help");
    console.log("");
    console.log("");
    return;
}

if (!program.src) {
    console.log('ERROR:invalid parameters [src]');
    console.log('');
    return false;
}

let cacheDir = path.join(process.cwd(), '/.offline/');
let srcPath = path.posix.join(process.cwd(), program.src);
mkdirsSync(cacheDir);

console.log('');
console.log(chalk.yellow('更新离线包 ...\n'));
let version = Date.now();
// 打包离线包
offline(srcPath, cacheDir).then((file) => {
    // 上传离线包到OSS
    return upload(file, version, config.oss)
}).then(url => {
    // 更新离线包配置
    return publish(url, version, config.app);
}).then(() => {
    console.log('');
    console.log(chalk.green("离线包更新成功"));
    console.log('');
}).catch(err => {
    console.log('');
    console.log(chalk.red(JSON.stringify(err)));
    console.log('');
});