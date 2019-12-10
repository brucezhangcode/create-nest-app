const inquirer = require('inquirer');
const program = require('commander');
const path = require('path');
const fsExtra = require('fs-extra');
const download = require('download-git-repo');

program
  .version(require('../package.json').version)
  .usage('<command> [options]');
(async () => {
  const res = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'please input your project dir name:',
      default: 'nest-app-tempalte',
    },
  ]);
  const name = res.name;
  program.parse(process.argv);
  console.log('your project name is', name);
  const projectDir = path.join(process.cwd(), name);
  console.log('create project at dir: ', projectDir);
  const exist = fsExtra.existsSync(projectDir);
  if (exist) {
    console.log(`${projectDir} is not empty!`);
    return;
  }
  fsExtra.mkdirSync(projectDir);
  const temp = path.join(projectDir, 'temp');
  fsExtra.mkdirSync(temp);
  await cloneRepository(temp);
  fsExtra.copySync(path.join(temp, 'packages', 'template/'), projectDir);
  fsExtra.removeSync(temp, { recursive: true });
})();

function cloneRepository(tempPath) {
  return new Promise((resolve, reject) => {
    download(
      'direct:https://github.com/brucecodezone/create-nest-app.git',
      tempPath,
      { clone: true },
      function(err) {
        if (err) {
          console.log('failed to download template err:', err);
          return reject(err);
        }
        console.log('success to download template~');
        resolve();
      },
    );
  });
}
