'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('../config/prod.env');
const project = require('../config/project.conf');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    ]
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:12].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:12].js')
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
    ],
    mergeDuplicateChunks: true,
    sideEffects: false,
    splitChunks: {
      // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为 all
      chunks: 'all',
      // 表示在压缩前的最小模块大小，默认为 0
      minSize: 30720,
      // 表示被引用次数，默认为 1
      minChunks: 1,
      // 最大的按需(异步)加载次数，默认为 1
      maxAsyncRequests: 9,
      // 最大的初始化加载次数，默认为 1
      maxInitialRequests: 9,
      // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
      name: false,
      cacheGroups: {
        // node_modules 公共模块
        vendors: {
          name: 'vendors',
          test: /node_modules[\\/](.*)\.js$/,
          chunks: 'all',
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true
        },
        // node_modules 中被2次以上引用的模块独立出来
        default: {
          name: 'default',
          test: /node_modules[\\/](.*)\.js$/,
          chunks: 'all',
          minChunks: 2,
          priority: -20,
          // 超过30KB且引用2次以上，则单独打包
          minSize: 30720,
          // 重用已有相同模块
          reuseExistingChunk: true
        },
        // 将 vue 全家桶独立出来
        vue: {
          name: 'vue',
          test: /node_modules[\\/](vue|vuex|vue-router)[\\/](.*)\.js$/,
          chunks: 'all',
          priority: -30,
          reuseExistingChunk: false
        },
        // 将 element-ui 独立出来（包含JS和CSS模块）
        element: {
          name: 'element',
          test: /node_modules[\\/]element-ui[\\/](.*)\.js$/,
          chunks: 'all',
          priority: -40,
          reuseExistingChunk: false
        },

        app: {
          name: 'app',
          test: /\.(less|scss|css)$/,
          chunks: 'all',
          priority: -50,
          minChunks: 1,
          reuseExistingChunk: true
        },
        elementui: {
          name: 'elementui',
          test: /node_modules[\\/]element-ui[\\/](.*)\.(less|scss|css)$/,
          chunks: 'all',
          priority: -60,
          minChunks: 1,
          reuseExistingChunk: false
        }
      }
    }
  },

  plugins: [

    // extract css into its own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].[contenthash:12].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:12].css') // "[id].[contenthash].css"
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // 复制 static 中的静态资源到 dist
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // 构建文件头部版权广告信息
    new webpack.BannerPlugin({
      banner: project.bannerHeader
    })
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  prodWebpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin({
    openAnalyzer: false
  }));
}

module.exports = prodWebpackConfig;
