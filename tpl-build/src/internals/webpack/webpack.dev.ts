import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import genericNames from 'generic-names';
import autoprefixer from 'autoprefixer';
import { TEMPLATE_PATH } from '../../constant';

const generateScope = genericNames('[name]__[local]__[hash:base64:5]', {
  context: process.cwd(),
});

const smp = new SpeedMeasurePlugin();

export default smp.wrap(
  merge<Configuration>(common, {
    entry: {
      app: path.resolve(process.cwd(), 'src/index.tsx'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      compress: true,
      port: 9002,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
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
            'style-loader',
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
        template: TEMPLATE_PATH,
        filename: path.resolve(process.cwd(), 'dist/index.html'),
        chunks: ['app'],
      }),
    ],
  })
);
