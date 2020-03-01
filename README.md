# cli-qdoo-offline
> qdoo offline cli

### install
```
> npm install cli-qdoo-offline --save-dev
```

### usage
```
> cli-qdoo-offline
  Usage: cli-qdoo-offline [options]
  --src                src path
  --config             config file def: ./qdoo-offline-config.json
  --help               show help
```

`qdoo-offline-config.json`

```json
{
    "app": {
        "type": "app",
        "appId": "your qdoo app id",
        "appSecret": "your qdoo app secret"
    },
    "oss": {
        "https":1,
        "region": "oss-cn-beijing",
        "accessKeyId": "your oss accessKeyId",
        "accessKeySecret": "your oss accessKeySecret",
        "bucket": "your oss bucket",
        "domain": "your oss domain",
        "path": "offline save dir"
    }
}
```