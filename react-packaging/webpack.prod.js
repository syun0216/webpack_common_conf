'use strict';
const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugins = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');


const prodConfig = {
  entry: {
    index: [
      "babel-polyfill",
      path.join(__dirname, 'src/index.js')
    ]
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: [{
          loader: 'thread-loader',
          options: {
            workers: true, // 多线程
            cache: true // 缓存
          }
        },
        {
          loader: 'babel-loader'
        }
      ]
    }]
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
    new webpack.DllReferencePlugin({
      manifest: require('./vendor/vendor.json')
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'vendor'),
      to: 'vendor',
      ignore: ['.*']
    }]),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ // 开启并行压缩
        parallel: 4
      })
    ]
  },
  resolve: {
    // alias: {
    //   'react-dom': './node_modules/react-dom/index.js',
    //   'react': './node_modules/react/index.js'
    // },
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['js'],
    mainFields: ['main']
  }
};

if (process.env.npm_config_report) { // 是否开启报告模式
  const {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer');
  prodConfig.plugins.push(new BundleAnalyzerPlugin({
    generateStatsFile: false
  }));
}

if (process.env.npm_config_speed) { // 是否展示loader打包速度
  const SpeedMeaurePlugin = require('speed-measure-webpack-plugin'); // loader打包速度
  const smp = new SpeedMeaurePlugin()
  module.exports = smp.wrap(merge(baseConfig, prodConfig));
} else {
  module.exports = merge(baseConfig, prodConfig);
}