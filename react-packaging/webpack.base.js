'use strict';
const path = require('path');
const chalk = require('chalk')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// const flage = {}

// process.argv.slice(2).forEach(arg => {
//   const [k, v = true] = arg.split('=')
//   flage[k] = v
// })
// console.log(chalk `{red.bold.bgWhite Hello world}`, flage);

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: "/",
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [{
        test: /js$/,
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        loader: 'eslint-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          },
        },
        {
          loader: 'image-webpack-loader',  // 压缩图片
          options: {
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: true,
      chunks: ['main', 'index'],
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}