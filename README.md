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
    --src                 src dir
    --config              config file, def: ./qdoo-offline-config.json
    --upload              upload to oss
    --publish             upload to oss and publish
    --debug               enable debug
    --all                 un filter .js.map file
    --help                show help

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