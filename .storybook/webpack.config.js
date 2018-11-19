var path = require('path');
var postcssConfig = require('../postcss.config.js')


module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        use: ['file-loader?name=img/[name].[ext]'],
      },
      {
        test: /\.(ttf|svg|woff2?|eot)$/,
        use: ['file-loader?name=font/[name].[ext]'],
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}
