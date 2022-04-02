const chalk = require('chalk');

const success = (msg: string) => {
  console.log(chalk.green(`[tpl-build]: ✔ ${msg}`));
};

const error = (msg: string) => {
  console.log(chalk.red(`[tpl-build]:× ${msg}`));
};

const warn = (msg: string) => {
  console.log(chalk.yellow(`[tpl-build]:⚠️ ${msg}`));
};

export default {
  success,
  error,
  warn,
};
