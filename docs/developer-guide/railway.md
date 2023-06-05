---
sidebar_label: "Railway"
---
# 部署 AppSpace 到 Railway 指南



AppSpace 支持使用 `Dockfile` 部署服务到 [Railway](https://railway.app/)（可免费体验）.

## 部署步骤

- Fork [AppSpace](https://github.com/appspa/app-space/fork) 项目到你自己的Github账号.
- 使用 [新建项目](https://railway.app/new) 到 "deploy from Github repo".
- 新增你需要的环境变到 Variables 页面.


### 环境变量
```angular2html
APP_SPA_DBPWD=bWHy6ZBakeOx0oMV3fG
APP_SPA_DBUSER=mongo
APP_SPA_DB_HOST=containers-us-west-181.railway.app
APP_SPA_DB_NAME=app_space
APP_SPA_DB_PORT=6106
APP_SPA_DOMAIN=https://app-space.up.railway.app
APP_SPA_HOST=0.0.0.0
APP_SPA_PORT=3000
```

