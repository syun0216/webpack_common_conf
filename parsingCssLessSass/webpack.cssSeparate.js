const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    index: './cssSrc/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'distCssSeparate'),
  },
  mode: 'none',
  module: {
    rules: [
      {
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        test: /.css$/
      },
      {
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
        test: /.less$/
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'cssSrc/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
    })
  ]
}