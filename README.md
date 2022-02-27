# PSN-API-With-Node-Express

PSN 奖杯等 API 反代，用于 PSN 奖杯插件

## Why

由于之前的 PHP 版本服务端过于笨重，且 PSN api 更新过于频繁，特放弃 PHP 版本

Node 版本直接使用有**多人维护**的 PSN api 模块，不再自行处理与验证 PSN api 有效性，提高开发和升级效率

## What

提供奖杯 api、token 刷新等基础 api 接口，同时接入 token 验证，以便阻止滥用

本程序作为 PSN WordPress 奖杯卡插件的后端程序，运行在可以通畅访问 PSN 服务器的国外主机上，提高获取速度

## When

预计在 2 周内初版移植完成（start at 2022.02.21）

## API

Hoppscotch API 配置，访问 Hoppscotch.io 导入并查看

```js
[
  {
    "requests": [
      {
        "preRequestScript": "",
        "testScript": "",
        "method": "GET",
        "auth": {
          "value": "",
          "addTo": "Headers",
          "authType": "none",
          "authActive": true,
          "key": ""
        },
        "headers": [],
        "endpoint": "<<Protocol>>://<<Domain>>:<<Port>>/<<Path>>",
        "params": [],
        "body": {
          "contentType": null,
          "body": null
        },
        "v": "1",
        "name": "默认"
      },
      {
        "name": "请求Token",
        "preRequestScript": "",
        "auth": {
          "authActive": true,
          "authType": "none",
          "addTo": "Headers",
          "key": "",
          "value": ""
        },
        "v": "1",
        "method": "GET",
        "endpoint": "<<Protocol>>://<<Domain>>:<<Port>>/<<Path>>/token",
        "testScript": "",
        "body": {
          "body": null,
          "contentType": null
        },
        "headers": [],
        "params": [
          {
            "active": true,
            "key": "auth_key",
            "value": "testkey"
          },
          {
            "key": "npsso",
            "value": "yournpsso",
            "active": true
          }
        ]
      },
      {
        "params": [
          {
            "value": "testkey",
            "active": true,
            "key": "auth_key"
          },
          {
            "value": "0",
            "active": true,
            "key": "offset"
          },
          {
            "active": true,
            "value": "10",
            "key": "limit"
          }
        ],
        "auth": {
          "addTo": "Headers",
          "authActive": true,
          "authType": "none",
          "key": "",
          "value": ""
        },
        "headers": [],
        "v": "1",
        "endpoint": "<<Protocol>>://<<Domain>>:<<Port>>/<<Path>>/trophy",
        "body": {
          "contentType": "application/json",
          "body": "{\n\"access_token\":\"your key\"\n}"
        },
        "name": "请求奖杯",
        "testScript": "",
        "preRequestScript": "",
        "method": "POST"
      }
    ],
    "folders": [],
    "v": 1,
    "name": "PSN"
  }
]
```