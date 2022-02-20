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
