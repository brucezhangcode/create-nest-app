const program = require('commander');
const { create } = require('./create-action');

program
  .version(require('../package.json').version)
  .command('create [destination]', 'create new project', create)
  .usage('<command> [options]');

program.parse(process.argv);

(async () => {})();
