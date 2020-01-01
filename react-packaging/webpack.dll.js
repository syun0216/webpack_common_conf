const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log(process.cwd())

module.exports = {
  context: process.cwd(),
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: ['.js', '.json', '.jsx', '.css', '.less']
  },
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './vendor'),
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'vendor/[name].json')
    })
  ]
};