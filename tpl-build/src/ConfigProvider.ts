import type { Configuration as WebpackConfiguration } from 'webpack';
import { Env, OVERRIDE_WEBPACK_CONFIG_PATHS } from './constant';
import DEFAULT_WEBPACK_DEV_CONFIG from './internals/webpack/webpack.dev';
import DEFAULT_WEBPACK_PROD_CONFIG from './internals/webpack/webpack.prod';
import { merge } from 'lodash';
import { checkFileIsExist } from './utils/file';

export interface IConfigProvider {
  getWebpackConfig(): WebpackConfiguration;
}

export class DevConfigProvider implements IConfigProvider {
  getWebpackConfig() {
    let config = {};
    if (checkFileIsExist(OVERRIDE_WEBPACK_CONFIG_PATHS.DEV)) {
      config = require(OVERRIDE_WEBPACK_CONFIG_PATHS.DEV);
    }
    return merge({}, DEFAULT_WEBPACK_DEV_CONFIG, config);
  }
}

export class ProdConfigProvider implements IConfigProvider {
  getWebpackConfig() {
    let config = {};
    if (checkFileIsExist(OVERRIDE_WEBPACK_CONFIG_PATHS.PROD)) {
      config = require(OVERRIDE_WEBPACK_CONFIG_PATHS.PROD);
    }
    return merge({}, DEFAULT_WEBPACK_PROD_CONFIG, config);
  }
}

export class ConfigProviderFactory {
  static getProvider(env: Env): IConfigProvider {
    if (env === 'dev') {
      return new DevConfigProvider();
    } else {
      return new ProdConfigProvider();
    }
  }
}
