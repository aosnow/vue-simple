import Vue from 'vue';
import { hash } from 'packages';

import ApiConf from '../conf/api.conf';

// 异步请求数据
const Actions = {
  upload(context, params) {
    return new Promise(resolve => {
      // 上传文件数据
      const uploadTasks = [];

      // 默认以“yyyy-mm”为目录名
      const date = new Date();
      const year = date.getFullYear();
      let month = '0' + (date.getMonth() + 1);
      month = month.substr(month.length - 1);
      const dir = `${year}-${month}`;

      // 创建请求任务集
      params.files.forEach(file => {
        const parseData = new FormData();

        parseData.append('dir', params.dir || dir);
        parseData.append('file', file.src);
        parseData.append('shopperId', 73862);

        uploadTasks.push({
          conf: file,
          request: () => Vue.$api.post(
            { getway: ApiConf.config.$getway, api: ApiConf.config.upload },
            parseData,
            {
              headers: {
                token: '30e5317e-eb5b-4820-91fb-7c60554a95fd',
                invoke_source: '2101',
                out_request_no: hash()
              },
              timeout: 600000, // 10 分钟
              onUploadProgress: file.progressor
            }
          )
        });
      });

      function completed() {
        const files = uploadTasks.map(task => task.conf);
        resolve(files);
      }

      function upload(tasks) {
        const task = tasks.shift();
        task.request().then(response => {
          let result = response.data;

          if (result.code === '10000') {
            // 将上传返回数据保存到 file 中
            task.conf.data = result.data;
          }

          // 继续上传下一个
          if (tasks.length > 0) {
            upload(tasks);
          }
          else {
            completed();
          }
        }).catch(() => {
          // 某个文件上传失败，继续上传下个文件
          if (tasks.length > 0) {
            upload(tasks);
          }
          else {
            completed();
          }
        });
      }

      // 启动上传
      upload(uploadTasks.slice());
    });
  }
};

export default {
  namespaced: true,
  strict: true,
  actions: Actions
};
