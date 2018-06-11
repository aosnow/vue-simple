# vue-simple

> Use Vue in the simplest and easiest way, contain more than one of plugins and other to do that, i hope you will like it.

## 安装方法
直接使用 npm 安装：
```
npm i vue-simple -S
```

## 文件选择器指令
该指令被封装成插件形式提供，使用方法如下：
```
import Vue from 'vue';
import { readfile, FileSelector } from 'vue-simple';

Vue.use(FileSelector);
```

开启`<div>`接受拖放文件支持：
```
<div class="dataset" :class="{enter:isDragEnter}"
     v-file-selector="{type:'drag',multiple:true,accept: 'image/*'}"
     @file-changed="fileChangedFromBinder"
     @drag-enter="dragenter"
     @drag-leave="dragleave">
  文件选择测试
</div>
```

让普通按钮具备文件选择功能：
```
<button v-file-selector="{accept: 'image/*'}" @file-changed="fileChangedFromBinder">点击上传</button>

fileChangedFromBinder(files) {
  // 应用所选择的文件
  this.setFiles(files);
}
```


## "缓存作用域"的使用
在`storage`的基础上设计`“root”`和`“app作用域”`，主要目的在于避免多个应用使用相同的`“key”`进行存取，会造成数据覆盖问题。

使用方法非常简单，只需要在使用存取业务之前，先为整个app设置一个唯一的识别码（推荐使用该应用的域名）：
```
import { setUnique } from 'vue-simple';


/*
setUnique('#A@*#FF@P#C)&^'); // 正确
setUnique('sliver box'); // 错误：不能包含空白字符
setUnique('abc'); // 错误：长度必须大于等于6位
setUnique('abc123'); // 警告：过于简单，推荐包含字母、数字、符号
*/
setUnique('abc.com'); // 正确

// 可以设置为 null 或 'root' 回到顶级“root”作用域：
setUnique(); // 正确
setUnique(null); // 正确
setUnique(''); // 正确
setUnique('root'); // 正确
```

## HTTP错误信息的拦截处理
一般使用 `axios` 的 `response` 拦截处理该 HTTP 错误信息：
```
import { Http } from 'vue-simple';

error(error) {
  const errInfo = Http.errorInfo(error);
  MessageBox.alert(errInfo, '提示', { type: 'warning', showClose: false });

  // 若需要将此错误继续抛出给 $api.post().catch() 进行捕获，则将 error 进行 return
  // 此处可以返回任何数据给 catch() 进行捕获，若不显示 return，则错误处理和请求都在此处终止
  // $api.post() 将不需要再另行处理发生错误时的逻辑，此逻辑已经被封装到 vue-simple 的 API 模块中
  return error;
}
```

该`vue-simple`包含一套自定义的`HttpErrorInfo`配置:
```
const HttpErrorInfo = {
  default: '发生未知错误',
  network: '网络异常或服务器连接失败',
  aborted: '请求被中止',
  timeout: '请求服务器响应超时，请求已经被中断',

  // 3xx: 重定向，需要进一步的操作以完成请求
  301: '请求的资源已被永久的移动到新URI',
  302: '请求的资源临时被移动，请重新发送请求',
  ...
  404: 'Not Found，所请求页面不存在',
  ...
 }
```
也可以通过以下方法实现自定义覆盖：
```
import { HttpErrorInfo } from 'vue-simple';

HttpErrorInfo.merge({404:'page not found.'});
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
- v1.2.2  增加文件上传组件支持 `packages/upload`，支持文件选择和拖放文件
- v1.2.1  优化 PersistedState 存取机制，设计“缓存作用域”概念，将各个应用之间的缓存数据进行独立以避免数据混乱或者冲突问题
- v1.2.0  优化 Axios.request 错误捕获处理逻辑，内置 HttpErrorInfo 错误信息集合。增加大量工具 http、utils、hash、object
- v1.1.20 优化相关细节
- v1.1.19 完善对应 types 声明文件包，优化细节
- v1.1.18 优化相关细节，增加前端触发文件下载功能，借助 blob 对象来实现
- v1.1.17 增加`PersistedRestore.restore`方法用于主动恢复已经存在的缓存数据到 vuex 中
- v1.1.16 优化相关细节
- v1.1.15 为 `get、post、delete、put` 添加第三个 `conf` 参数，便于单次请求覆盖默认参数。另外增加对 `post` 请求 `Blob` 数据由前端触发文件下载的支持
- v1.1.14 增加`PersistedClear.remove`方法用于主动清除缓存数据
- v1.1.13 增加`PersistedConfig`注册时过期参数`expire`(单位：秒)支持，支持各引擎以周期性的自动请求新的数据
- v1.1.12 `PersistedAction` 增加 `force` 选项支持，设置是否强制重新请求，以便于重写新的数据（主要应用于本地数据包装的存储和恢复，如搜索结果缓存等）
- v1.1.11 优化 `request body` 处理逻辑，只对 `application/json` 进行处理
- v1.1.5  增加 `packages/PersistedState` 数据持久化解决方案，优化 API 模块
