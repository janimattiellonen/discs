const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const dotenv = require('dotenv')
const webpack = require('webpack')

const env = dotenv.config().parsed
/*
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})
*/

const envKeys = []

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:9091',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.js',
  ],
  devtool: 'eval-source-map',
  devServer: {
    port: 9091,
    disableHostCheck: true,
    publicPath: `http://localhost:9091/`,
    historyApiFallback: true,
    /*
      https: {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'nginx-selfsigned.key')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'nginx-selfsigned.crt')),
      ca: fs.readFileSync(path.join(__dirname, 'cert', 'dhparam.pem')),
    },
    */
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: './src/assets' }]),
    new HtmlWebpackPlugin({
      title: 'My discs',
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'js/[name].js',
    //path: path.resolve(__dirname, 'dist'),
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['*', '.js', '.jsx'],
  },
}
