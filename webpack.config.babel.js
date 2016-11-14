import path from 'path';

module.exports = {
  target: 'electron',
  entry: './src/ui/renderer.js',
  output: {
    path: path.resolve(__dirname, 'build/dist/ui'),
    filename: 'ui.bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src/ui'),
        ],
        test: /\.js/,
      },
    ],
  },
};
