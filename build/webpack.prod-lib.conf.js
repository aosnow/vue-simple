'use strict';

const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const project = require('../config/project.conf');
const nodeExternals = require('webpack-node-externals');

const LibRoot = path.resolve(__dirname, '../lib');
const PackageRoot = path.resolve(__dirname, '../packages');

function resolve(dir) {
  return path.join(LibRoot, dir);
}

/**
 * @type {webpack.Configuration}
 */
const prodWebpackConfig = {
  target: 'web',
  externals: [nodeExternals()],
  mode: 'production',
  entry: {
    index: './packages',
    Api: './packages/api/Api.js',
    interceptor: './packages/api/interceptor.js',
    hashCode: './packages/utils/hashCode.js',
  },
  resolve: {
    extensions: ['.js', '.vue', 'less', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /packages[\\/](.*)\.js$/,
        loader: 'babel-loader',
        include: [PackageRoot]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('fonts/[name].[hash:7].[ext]')
        }
      },
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    ]
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: LibRoot,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  // optimization: {
  //   minimizer: [
  //     // Compress extracted CSS. We are using this plugin so that possible
  //     // duplicated CSS from different components can be deduped.
  //     new OptimizeCSSPlugin({
  //       cssProcessor: require('cssnano'),
  //       cssProcessorOptions: { safe: true }
  //     })
  //   ],
  //   mergeDuplicateChunks: true,
  //   sideEffects: false,
  //   splitChunks: {
  //     // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为 all
  //     chunks: 'all',
  //     // 表示在压缩前的最小模块大小，默认为 0
  //     minSize: 1,
  //     // 表示被引用次数，默认为 1
  //     minChunks: 1,
  //     // 最大的按需(异步)加载次数，默认为 1
  //     maxAsyncRequests: 5,
  //     // 最大的初始化加载次数，默认为 1
  //     maxInitialRequests: 3,
  //     // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
  //     name: true
  //     // cacheGroups: {
  //     //   // vendors: {
  //     //   //   test: /[\\/]node_modules[\\/]/,
  //     //   //   priority: -10
  //     //   // },
  //     //   default: {
  //     //     minChunks: 2,
  //     //     priority: -20,
  //     //     reuseExistingChunk: true,
  //     //     enforce: true
  //     //   }
  //     // }
  //   }
  // },
  // 排除所有 node_modules 中的包，只打包 packages
  plugins: [

    // extract css into its own file
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.join(LibRoot, 'css/[name].css'),
      chunkFilename: path.join(LibRoot, 'css/[name].css') // "[id].[contenthash].css"
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // 构建文件头部版权广告信息
    new webpack.BannerPlugin({
      banner: project.bannerHeader
    })
  ],

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin({
    openAnalyzer: false
  }));
}

module.exports = prodWebpackConfig;
