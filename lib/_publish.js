var request = require('request');

function publish(url, version, app) {
    console.log(`[QDOO] 更新离线包配置...`);
    console.log(`[QDOO] 发起更新请求...`);
    if (!app.type) {
        app.type = "app";
    }
    let data = Object.assign({}, app, { url, version })
    console.log(data);
    return new Promise((resolve, reject) => {
        request({
            url: app.api || "https://api.iqudoo.com/offline/update",
            method: "POST",
            encoding: 'utf8',
            form: JSON.stringify(data),
            timeout: 5000,
            json: true,
        }, function (_err, _res, body) {
            if (body.code == 0) {
                resolve(body.data);
            } else {
                reject(body);
            }
        });
    })
}

module.exports = exports = {
    publish
}