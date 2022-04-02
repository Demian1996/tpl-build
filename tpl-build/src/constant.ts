import path from 'path';

export type Env = 'dev' | 'prod';

export const CLI_ROOT_PATH = path.resolve(__dirname, '..');

export const TEMPLATE_PATH = path.resolve(CLI_ROOT_PATH, 'lib/template/index.html');

export const OVERRIDE_WEBPACK_CONFIG_PATHS = {
  ROOT: path.resolve(process.cwd(), './webpack'),
  DEV: path.resolve(process.cwd(), './webpack/webpack.dev.js'),
  PROD: path.resolve(process.cwd(), './webpack/webpack.prod.js'),
};
