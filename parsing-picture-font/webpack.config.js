'use strict';

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
         test: /.(woff|woff2|eot|ttf|otf)$/,
         use: 'file-loader'         
      },
      {
        test: /.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name:'[name]_[hash:8].[ext]',
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: true,
      chunks: ['index'],
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/assets'),
        to: path.join(__dirname, 'dist/assets'),
        ignore: ['*.otf']
      }
    ]),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/')
    }
  }
}