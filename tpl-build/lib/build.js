'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
var genericNames$1 = require('generic-names');
var autoprefixer = require('autoprefixer');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var lodash = require('lodash');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Webpack__default = /*#__PURE__*/_interopDefaultLegacy(Webpack);
var WebpackDevServer__default = /*#__PURE__*/_interopDefaultLegacy(WebpackDevServer);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var HtmlWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(HtmlWebpackPlugin);
var SpeedMeasurePlugin__default = /*#__PURE__*/_interopDefaultLegacy(SpeedMeasurePlugin);
var genericNames__default = /*#__PURE__*/_interopDefaultLegacy(genericNames$1);
var autoprefixer__default = /*#__PURE__*/_interopDefaultLegacy(autoprefixer);
var MiniCssExtractPlugin__default = /*#__PURE__*/_interopDefaultLegacy(MiniCssExtractPlugin);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var chalk = require('chalk');

var success = function (msg) {
  console.log(chalk.green("[tpl-build]: \u2714 ".concat(msg)));
};

var error = function (msg) {
  console.log(chalk.red("[tpl-build]:\u00D7 ".concat(msg)));
};

var warn = function (msg) {
  console.log(chalk.yellow("[tpl-build]:\u26A0\uFE0F ".concat(msg)));
};

var log = {
  success: success,
  error: error,
  warn: warn
};

var CLI_ROOT_PATH = path__default["default"].resolve(__dirname, '..');
var TEMPLATE_PATH = path__default["default"].resolve(CLI_ROOT_PATH, 'lib/template/index.html');
var OVERRIDE_WEBPACK_CONFIG_PATHS = {
  ROOT: path__default["default"].resolve(process.cwd(), './webpack'),
  DEV: path__default["default"].resolve(process.cwd(), './webpack/webpack.dev.js'),
  PROD: path__default["default"].resolve(process.cwd(), './webpack/webpack.prod.js')
};

var genericNames = require('generic-names');

var babelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [// css-modules
  ['babel-plugin-react-css-modules', {
    exclude: 'node_modules',
    webpackHotModuleReloading: true,
    generateScopedName: genericNames('[name]__[local]__[hash:base64:5]'),
    autoResolveMultipleImports: true,
    filetypes: {
      '.less': {
        syntax: 'postcss-less'
      }
    }
  }]]
};

var common = {
  output: {
    filename: '[name].[contenthash].js',
    path: path__default["default"].resolve(process.cwd(), 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: babelConfig
      }
    }, {
      test: /\.(png|gif|jpg)$/,
      exclude: /node_modules/,
      type: 'asset/resource'
    }]
  }
};

var generateScope$1 = genericNames__default["default"]('[name]__[local]__[hash:base64:5]', {
  context: process.cwd()
});
var smp = new SpeedMeasurePlugin__default["default"]();
var DEFAULT_WEBPACK_DEV_CONFIG = smp.wrap(webpackMerge.merge(common, {
  entry: {
    app: path__default["default"].resolve(process.cwd(), 'src/index.tsx')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9002,
    hot: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer__default["default"]]
          }
        }
      }]
    }, {
      test: /\.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: function (_a, localIdentName, localName) {
              var resourcePath = _a.resourcePath;
              return generateScope$1(localName, resourcePath);
            }
          }
        }
      }, {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer__default["default"]]
          }
        }
      }, 'less-loader']
    }]
  },
  plugins: [new HtmlWebpackPlugin__default["default"]({
    template: TEMPLATE_PATH,
    filename: path__default["default"].resolve(process.cwd(), 'dist/index.html'),
    chunks: ['app']
  })]
}));

var generateScope = genericNames__default["default"]('[name]__[local]__[hash:base64:5]', {
  context: process.cwd()
});
var DEFAULT_WEBPACK_PROD_CONFIG = webpackMerge.merge(common, {
  entry: {
    app: path__default["default"].resolve(process.cwd(), 'src/index.tsx')
  },
  output: {
    filename: 'index.js',
    path: path__default["default"].resolve(process.cwd(), 'dist')
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [{
      test: /\.css/,
      use: [MiniCssExtractPlugin__default["default"].loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer__default["default"]]
          }
        }
      }]
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin__default["default"].loader, {
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: function (_a, localIdentName, localName) {
              var resourcePath = _a.resourcePath;
              return generateScope(localName, resourcePath);
            }
          }
        }
      }, {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [autoprefixer__default["default"]]
          }
        }
      }, 'less-loader']
    }]
  },
  plugins: [new HtmlWebpackPlugin__default["default"]({
    template: path__default["default"].resolve(process.cwd(), 'template/index.html'),
    filename: path__default["default"].resolve(process.cwd(), 'dist/index.html'),
    chunks: ['app']
  })]
});

function checkFileIsExist(filePath) {
  try {
    fs__default["default"].accessSync(filePath, fs__default["default"].constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

var DevConfigProvider =
/** @class */
function () {
  function DevConfigProvider() {}

  DevConfigProvider.prototype.getWebpackConfig = function () {
    var config = {};

    if (checkFileIsExist(OVERRIDE_WEBPACK_CONFIG_PATHS.DEV)) {
      config = require(OVERRIDE_WEBPACK_CONFIG_PATHS.DEV);
    }

    return lodash.merge({}, DEFAULT_WEBPACK_DEV_CONFIG, config);
  };

  return DevConfigProvider;
}();

var ProdConfigProvider =
/** @class */
function () {
  function ProdConfigProvider() {}

  ProdConfigProvider.prototype.getWebpackConfig = function () {
    var config = {};

    if (checkFileIsExist(OVERRIDE_WEBPACK_CONFIG_PATHS.PROD)) {
      config = require(OVERRIDE_WEBPACK_CONFIG_PATHS.PROD);
    }

    return lodash.merge({}, DEFAULT_WEBPACK_PROD_CONFIG, config);
  };

  return ProdConfigProvider;
}();

var ConfigProviderFactory =
/** @class */
function () {
  function ConfigProviderFactory() {}

  ConfigProviderFactory.getProvider = function (env) {
    if (env === 'dev') {
      return new DevConfigProvider();
    } else {
      return new ProdConfigProvider();
    }
  };

  return ConfigProviderFactory;
}();

var DevBuilder =
/** @class */
function () {
  function DevBuilder() {
    this.env = 'dev';
  }

  DevBuilder.prototype.run = function () {
    this.configProvider = ConfigProviderFactory.getProvider(this.env);
    var webpackConfig = this.configProvider.getWebpackConfig();
    var compiler = Webpack__default["default"](webpackConfig);

    var devServerOptions = __assign(__assign({}, webpackConfig.devServer), {
      open: true
    });

    var server = new WebpackDevServer__default["default"](devServerOptions, compiler);
    server.startCallback(function (err) {
      if (err) {
        log.error(err.message);
      }
    });
  };

  return DevBuilder;
}();

var ProdBuilder =
/** @class */
function () {
  function ProdBuilder() {
    this.env = 'prod';
  }

  ProdBuilder.prototype.run = function () {
    this.configProvider = ConfigProviderFactory.getProvider(this.env);
    var webpackConfig = this.configProvider.getWebpackConfig();
    Webpack__default["default"](webpackConfig, function (err, stats) {
      var _a;

      if (err) {
        log.error(err.message);
        return;
      }

      if (stats) {
        var info = stats.toJson();

        if (stats.hasErrors()) {
          (_a = info.errors) === null || _a === void 0 ? void 0 : _a.forEach(function (error) {
            return log.error(error.message);
          });
          process.exit(1);
        }
      }
    });
  };

  return ProdBuilder;
}();

var BuilderFactory =
/** @class */
function () {
  function BuilderFactory() {}

  BuilderFactory.getBuilder = function (env) {
    if (env === 'dev') {
      return new DevBuilder();
    } else {
      return new ProdBuilder();
    }
  };

  return BuilderFactory;
}();

exports.BuilderFactory = BuilderFactory;
