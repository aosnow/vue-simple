'use strict';

require('./check-versions')();

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production use webpack4...');
spinner.start();

// 默认情况下只清除 dist/static 目录下的内容
// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {

// 修改成完成清除整个 dist 目录，避免目录结构调整后无法清除
rm(config.build.assetsRoot, err => {
  if (err) throw err;

  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
