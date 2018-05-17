# vue-simple

> Use Vue in the simplest and easiest way, contain more than one of plugins and other to do that, i hope you will like it.

## 安装方法
直接使用 npm 安装：
```
npm i vue-simple -S
```

## Vue 插件
- **Api 通信模块**
基于`axios`库，实现通信模块的封装，业务数据存放于`request body`，而请求参数存放于`headers`或`url params`

- **Interceptor 拦截器**
`Axios` 拦截器代理器，快捷管理`axios`的`request`和`response`的拦截功能

## Vuex 插件
- **PersistedState**
数据持久化方案支持，支持`“localStorage、sessionStorage、memory”`三种缓存引擎（通过`force`参数，可实现本地数据缓存与state之间的存储和恢复需求）

## Update record
- v1.1.13 增加`PersistedConfig`注册时过期参数`expire`(单位：秒)支持，支持各引擎以周期性的自动请求新的数据
- v1.1.12 `PersistedAction` 增加 `force` 选项支持，设置是否强制重新请求，以便于重写新的数据（主要应用于本地数据包装的存储和恢复，如搜索结果缓存等）
- v1.1.11 优化 `request body` 处理逻辑，只对 `application/json` 进行处理
- v1.1.5 增加 `packages/plugins/PersistedState` 数据持久化解决方案，优化 API 模块
