var request = require('request');

function publish(url, version, app, debug) {
    console.log(`[QDOO] 开始发布离线包...`);
    return new Promise((resolve, reject) => {
        if (!app || !app.id || !app.host) {
            reject(`无效的APP配置`);
            return;
        }
        if (!app.type) {
            app.type = "app";
        }
        let api = app.api || "https://api.iqudoo.com/offline/update";
        let data = Object.assign({}, app, { url, version })
        if (debug) {
            console.log(`[QDOO] 更新离线包配置...`, api);
            console.log(``);
            console.log(data);
        }
        request({
            url: api,
            method: "POST",
            encoding: 'utf8',
            body: data,
            timeout: 5000,
            json: true,
        }, function (err, _res, body) {
            if (err) {
                reject(err);
                return;
            }
            if (body && body.code == 0) {
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