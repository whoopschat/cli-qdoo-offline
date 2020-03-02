var request = require('request');

function publish(url, version, app) {
    console.log(`[QDOO] 开始发布离线包...`);
    return new Promise((resolve, reject) => {
        if (!app || !app.id || !app.host) {
            reject(`无效的APP配置`);
            return;
        }
        if (!app.type) {
            app.type = "app";
        }
        let data = Object.assign({}, app, { url, version })
        request({
            url: app.api || "https://api.iqudoo.com/offline/update",
            method: "POST",
            encoding: 'utf8',
            body: data,
            timeout: 5000,
            json: true,
        }, function (_err, _res, body) {
            if (body.code == 0) {
                resolve(body);
            } else {
                reject(body);
            }
        });
    })
}

module.exports = exports = {
    publish
}