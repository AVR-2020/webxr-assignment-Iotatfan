var fs = require('fs');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    hotOnly: true,
    inline: true,
    https: true
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ['aframe-super-hot-loader']
      },
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: ['aframe-super-hot-html-loader',
        {
          loader: 'html-require-loader',
          options: {
            root: path.resolve(__dirname, 'src')
          }
        }
      ]
      },
    ]
  }
};