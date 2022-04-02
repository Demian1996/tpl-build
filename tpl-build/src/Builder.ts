import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import log from './utils/log';
import { IConfigProvider, ConfigProviderFactory } from './ConfigProvider';
import type { Env } from './constant';

export interface IBuilder {
  run(): void;
}

export class DevBuilder implements IBuilder {
  env: Env = 'dev';
  configProvider: IConfigProvider;

  run() {
    this.configProvider = ConfigProviderFactory.getProvider(this.env);
    const webpackConfig = this.configProvider.getWebpackConfig();
    const compiler = Webpack(webpackConfig);
    const devServerOptions = { ...webpackConfig.devServer, open: true };
    const server = new WebpackDevServer(devServerOptions, compiler);
    server.startCallback((err) => {
      if (err) {
        log.error(err.message);
      }
    });
  }
}

export class ProdBuilder implements IBuilder {
  env: Env = 'prod';
  configProvider: IConfigProvider;

  run() {
    this.configProvider = ConfigProviderFactory.getProvider(this.env);
    const webpackConfig = this.configProvider.getWebpackConfig();
    Webpack(webpackConfig, (err, stats) => {
      if (err) {
        log.error(err.message);
        return;
      }
      if (stats) {
        const info = stats.toJson();
        if (stats.hasErrors()) {
          info.errors?.forEach((error) => log.error(error.message));
          process.exit(1);
        }
      }
    });
  }
}

export class BuilderFactory {
  static getBuilder(env: Env): IBuilder {
    if (env === 'dev') {
      return new DevBuilder();
    } else {
      return new ProdBuilder();
    }
  }
}
