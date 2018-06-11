'use strict';

/**
 * 当前项目配置
 * @type {{name : string, author : string, company : string}}
 */
const projectConfig = {
	name: '银盒宝成开发框架',
	author: 'Aosnow - 前端组',
	company: '杭州银盒宝成科技有限公司'
};

/**
 * 当前项目在 build 时附加到文件顶部的版权信息
 * @type {string}
 */
const bannerHeader = projectConfig.name + '\n' +
                     projectConfig.author + '\n' +
                     projectConfig.company + '\n' +
                     "hash:[hash]\n" +
                     "chunkhash:[chunkhash]\n" +
                     "name:[name]\n" +
                     "file:[file]";

module.exports = {
	projectConfig: projectConfig,
	bannerHeader: bannerHeader
};
