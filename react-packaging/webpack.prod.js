'use strict';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugins = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const SpeedMeaurePlugin = require('speed-measure-webpack-plugin'); // loader打包速度
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

const smp = new SpeedMeaurePlugin()

const prodConfig = {
  entry: {
    index: [
      "babel-polyfill",
      path.join(__dirname, 'src/index.js')
    ]
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: true, // 多线程
              cache: true // 缓存
            }
          },
          {
            loader: 'babel-loader',
            query: {
              compact: false
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugins({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ]
    }),
    new CleanWebpackPlugin()
  ]
};

if(process.env.npm_config_report) { // 是否开启报告模式
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  prodConfig.plugins.push(new BundleAnalyzerPlugin({
    generateStatsFile: false
  }));
}




module.exports = smp.wrap(merge(baseConfig, prodConfig));


