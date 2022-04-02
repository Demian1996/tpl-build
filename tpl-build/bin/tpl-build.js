#!/usr/bin/env node

const { BuilderFactory } = require('../lib/build.js');
const { program } = require('commander');
const pkg = require('../package.json');

program.version(pkg.version, '-v, --version');

program
  .command('dev')
  .description('使用开发环境配置构建项目')
  .action(async () => {
    BuilderFactory.getBuilder('dev').run();
  });

program
  .command('build')
  .description('使用生产环境配置构建项目')
  .action(async () => {
    BuilderFactory.getBuilder('prod').run();
  });

program.parse(process.argv);
