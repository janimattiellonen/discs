const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const dotenv = require('dotenv')
const webpack = require('webpack')

const env = dotenv.config().parsed

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: { app: './src/index.js' },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CopyWebpackPlugin([{ from: './src/assets' }]),
    new HtmlWebpackPlugin({
      title: 'My discs',
      filename: 'index.html',
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],
  output: {
    //filename: 'js/[name].js',
    filename: 'js/[name].[contenthash:8].js',
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  optimization: {
    minimize: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
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
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '/' },
          },
          'css-loader',
        ],
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
              name: 'fonts/[name].[hash:8].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    //alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['.jsx', '.js', '.scss', '.sass', '.css'],
  },
}
