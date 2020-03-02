function stringReplaceAll(str, s1, s2) {
    if (s1 === s2) {
        return str;
    }
    return str.split(s1).join(s2);
}

function parserOpts(opts, prefix, filter) {
    let obj = {};
    let parser = (key, val) => {
        Object.keys(val).forEach(k => {
            if (typeof val[k] === 'string') {
                let ak = `${key}.${k}`;
                if (!filter || filter(ak, opts[key])) {
                    obj[ak] = val[key];
                }
            } else if (typeof val[k] === 'object') {
                parser(`${key}.${k}`, val[k])
            }
        });
    };
    Object.keys(opts).forEach(key => {
        if (key.indexOf(prefix) == 0) {
            let _key = key.replace(prefix, '');
            let _value = opts[key];
            if (typeof _value === 'string') {
                let ak = stringReplaceAll(_key, "_", ".");
                if (!filter || filter(ak, opts[key])) {
                    obj[ak] = opts[key];
                }
            } else if (typeof _value === 'object') {
                parser(_key, _value);
            }
        }
    });
    return obj;
}

function formatDate(input, fmt) {
    let date;
    if (input instanceof Date) {
        date = input;
    } else {
        date = new Date(input);
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S+': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
        }
    }
    return fmt;
}

module.exports = {
    formatDate,
    stringReplaceAll,
    parserOpts,
}