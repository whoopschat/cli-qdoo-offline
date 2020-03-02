# cli-qdoo-offline
> qdoo offline cli

### install
```
> npm install cli-qdoo-offline --save-dev
```

### usage
```
> cli-qdoo-offline --help
  Usage: cli-qdoo-offline [options]
  --src                资源目录
  --config             配置文件，默认: ./qdoo-offline-config.json
  --upload             上传文件到oss
  --publish            上传文件到oss并发布
  --help               显示帮助信息
```

`qdoo-offline-config.json`

```json
{
    "app": {
        "type": "app",
        "host": "offline host: cdn.iqudoo.com/app/",
        "id": "your qdoo app id",
        "secret": "your qdoo app secret"
    },
    "oss": {
        "https": 1,
        "region": "oss-cn-beijing",
        "accessKeyId": "your oss accessKeyId",
        "accessKeySecret": "your oss accessKeySecret",
        "bucket": "your oss bucket",
        "domain": "your oss domain",
        "path": "offline save dir path: /offline/app/"
    }
}
```