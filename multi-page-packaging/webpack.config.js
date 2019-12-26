const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mpaBuild = () => { // 多页面打包配置
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  entryFiles.map(_file => {
    const match = _file.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    entry[pageName] = _file
    htmlWebpackPlugins.push(
      new HTMLWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  });
  return {
    entry,
    htmlWebpackPlugins
  }
}

const {
  entry,
  htmlWebpackPlugins
} = mpaBuild()

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [{
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name]_[contenthash:8].css'}), 
    ...htmlWebpackPlugins
  ]
}