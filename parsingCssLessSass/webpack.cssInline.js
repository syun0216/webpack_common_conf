const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './cssSrc/index.js',  
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'distCssInline'),
  },
  mode: 'none',
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /.css$/
      },
      {
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
        test: /.less$/
      },
    ]
  },
  plugins: [
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