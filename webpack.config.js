const path = require('path');

module.exports = {
  entry: './client/index.ts',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules|server/,
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
    ],
  },
};
