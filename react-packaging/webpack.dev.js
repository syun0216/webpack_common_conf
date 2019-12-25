const baseConfig = require('./webpack.base');
const webpack = require('webpack')
const merge = require('webpack-merge');

const devConfig = {
  devServer: {
    compress: true,
    open: false,
    host: 'localhost',
    port: '9527',
    hot: true,
    stats: 'errors-only'
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig);
