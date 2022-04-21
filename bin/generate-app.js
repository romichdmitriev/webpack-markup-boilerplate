#! /usr/bin/env node

const path = require('path');
const util = require('util');
const fs = require('fs');
const packageJson = require('../package.json');
const exec = util.promisify(require('child_process').exec);

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log('\x1b[31m', error, '\x1b[0m');
  }
}

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = 'https://github.com/romichdmitriev/webpack-markup-boilerplate.git';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      '\x1b[31m',
      `The file ${projectName} already exist in the current directory, please give it another name.`,
      '\x1b[0m',
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

function buildPackageJson(packageJSON, folderName) {
  const { bin, keywords, license, homepage, repository, bugs, ...newPackage } = packageJSON;

  Object.assign(newPackage, {
    name: folderName,
    version: '1.0.0',
    description: '',
    author: '',
    scripts: {
      start: 'webpack serve --config webpack.dev.js --progress',
      build: 'webpack --config webpack.prod.js --stats-children --progress',
      eslint: 'eslint ./src/js/*',
      'eslint:--fix': 'eslint --fix ./src/js/*',
      stylelint: 'stylelint ./**/*.scss !./dist/**/*.css',
      'stylelint:--fix': 'stylelint ./**/*.scss !./dist/**/*.css --fix',
      'prettier:--fix': 'prettier ./src/**/*.{js,scss,pug,html} --write',
      'lint:fix': 'yarn run eslint:--fix && yarn run stylelint:--fix && yarn run prettier:--fix',
    },
    browserslist: ['> 2%', 'last 5 versions'],
    dependencies: {},
    devDependencies: {
      '@babel/core': '^7.15.4',
      '@babel/plugin-proposal-class-properties': '^7.14.5',
      '@babel/plugin-transform-runtime': '^7.15.0',
      '@babel/preset-env': '^7.15.4',
      '@prettier/plugin-pug': '^1.20.1',
      autoprefixer: '^10.4.4',
      'babel-eslint': '^10.1.0',
      'babel-loader': '^8.2.2',
      'clean-webpack-plugin': '^4.0.0',
      'copy-webpack-plugin': '^9.0.1',
      'css-loader': '^6.2.0',
      'css-minimizer-webpack-plugin': '^3.0.2',
      eslint: '^7.32.0',
      'eslint-config-airbnb': '^18.2.1',
      'eslint-config-prettier': '^8.3.0',
      'eslint-loader': '^4.0.2',
      'eslint-plugin-import': '^2.24.2',
      'eslint-plugin-prettier': '^4.0.0',
      'file-loader': '^6.2.0',
      glob: '^7.1.7',
      'html-loader': '^2.1.2',
      'html-webpack-plugin': '5',
      'image-minimizer-webpack-plugin': '^3.2.3',
      'imagemin-gifsicle': '^7.0.0',
      'imagemin-jpegtran': '^7.0.0',
      'imagemin-optipng': '^8.0.0',
      'imagemin-svgo': '^10.0.1',
      'imagemin-webp': '^7.0.0',
      'imagemin-webp-webpack-plugin': '^3.3.6',
      'imagemin-webpack-plugin': '^2.4.2',
      'mini-css-extract-plugin': '^2.2.2',
      postcss: '^8.3.6',
      'postcss-import': '^14.0.2',
      'postcss-loader': '^6.1.1',
      'postcss-nesting': '^8.0.1',
      'postcss-preset-env': '^7.4.3',
      'postcss-scss': '^4.0.3',
      prettier: '^2.3.2',
      pug: '^3.0.2',
      'pug-loader': '^2.4.0',
      sass: '^1.50.1',
      'sass-loader': '^12.6.0',
      'style-loader': '^3.2.1',
      stylelint: '^13.13.1',
      'stylelint-config-standard': '^22.0.0',
      'stylelint-order': '^4.1.0',
      'svg-sprite-loader': '^6.0.11',
      'svgo-loader': '^3.0.0',
      'terser-webpack-plugin': '^5.2.3',
      webpack: '^5.52.0',
      'webpack-cli': '^4.8.0',
      'webpack-dev-server': '^4.1.0',
      'webpack-merge': '^5.8.0',
    },
  });

  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(newPackage, null, 2), 'utf8');
}

async function main() {
  try {
    console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
    await runCmd(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);

    console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
    await runCmd('npm install');

    console.log('Removing useless files');
    await runCmd('npx rimraf ./.git');
    fs.unlinkSync(path.join(projectPath, 'LICENSE.MD'));
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });
    fs.unlinkSync(path.join(projectPath, 'package.json'));

    buildPackageJson(packageJson, projectName);

    console.log('\x1b[32m', 'The installation is done, this is ready to use !', '\x1b[0m');
  } catch (error) {
    console.log(error);
  }
}

main();
