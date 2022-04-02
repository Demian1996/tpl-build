import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import genericNames from 'generic-names';
import autoprefixer from 'autoprefixer';

const generateScope = genericNames('[name]__[local]__[hash:base64:5]', {
  context: process.cwd(),
});

export default merge<Configuration>(common, {
  entry: {
    app: path.resolve(process.cwd(), 'src/index.tsx'),
  },
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent({ resourcePath }, localIdentName, localName) {
                  return generateScope(localName, resourcePath);
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'template/index.html'),
      filename: path.resolve(process.cwd(), 'dist/index.html'),
      chunks: ['app'],
    }),
  ],
});
