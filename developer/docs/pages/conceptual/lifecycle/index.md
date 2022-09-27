---
title: Blocklet Lifecycle
description: Blocklet Lifecycle
layout: documentation
---

> This doc is a draft and needs to be updated

| 钩子名称     | 运行时机                         | 抛错的影响           | 使用场景                           |
| ------------ | -------------------------------- | -------------------- | ---------------------------------- |
| preInstall   | 全新安装或者升级时，下载完成之后 | 终止安装             | 检查依赖的环境                     |
| postInstall  | 全新安装或者升级成功后           | 终止安装或升级       | 准备运行环境                       |
| preStart     | 启动之前                         | 无法启动，报启动失败 | 检查配置、注册账户、初始化数据库等 |
| postStart    | 启动之后                         | 无影响               | 生成一些配置、更新索引、状态上报   |
| preStop      | 停止之前                         | 无影响               | 做一些清理工作                     |
| postStop     | 停止之后                         | 无影响               | 做一些清理工作                     |
| preUninstall | 删除之前                         | 无影响               | 状态上报                           |
| preConfig    | 修改并保存配置之前               | 配置保存失败         | 校验配置是否有效                   |
| migration    | 新版安装完启动之前               | 无法启动，报启动失败 | 迁移数据                           |
