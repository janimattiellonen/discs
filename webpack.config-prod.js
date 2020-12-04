const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log('PATH: ' + __dirname)

module.exports = {
  mode: 'development',
  entry: { app2: './src/index.js' },
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
}
