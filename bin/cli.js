#!/usr/bin/env node

const { execSync } = require('child_process');

const runCommand = command => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error(`Failed to execute ${command}`);
    return false;
  }
};

const defaultRepoName = 'psec-nodejs-skeleton';
const repoName = process.argv[2] || defaultRepoName;

const gitCheckoutCommand = `git clone --depth 1 https://github.com/leoclc/${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(`Congratulations! You are ready. Follow the following command to start:`);
console.log(`cd ${repoName}`);
console.log(`Now Please add your database credentials in .env.development.local`);
console.log(`Finally, npm run dev or npm start`);
