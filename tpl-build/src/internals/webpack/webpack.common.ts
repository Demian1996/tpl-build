import path from 'path';
import babelConfig from '../babel/babel.config';

export default {
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        },
      },
      {
        test: /\.(png|gif|jpg)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
    ],
  },
};
