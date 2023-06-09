#!/usr/bin/env node

import { type PackageJson } from 'type-fest';
import path from 'path';
import fs from 'fs-extra';
import { renderTitle } from './utils/renderTitle.js';
import { initializeGit } from './helpers/git.js';
import { getVersion } from './utils/getVersion.js';
import { logger } from './utils/logger.js';
import { parseNameAndPath } from './utils/parseNameAndPath.js';
import { installDependencies } from './helpers/installDependencies.js';

import { createProject } from './createProject/createProject.js';

import { logNextSteps } from './helpers/logNextSteps.js';
import { runCli } from './cli.js';

type DgraphInitPackageJSON = PackageJson & {
  dgraphInitMetadata?: {
    initVersion: string;
  };
};

const main = async () => {
  //   const npmVersion = await getNpmVersion();
  renderTitle();
  //   npmVersion && renderVersionWarning(npmVersion);

  const {
    appName,
    flags: { noGit, noInstall },
  } = await runCli();

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    noInstall,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(path.join(projectDir, 'package.json')) as DgraphInitPackageJSON;
  pkgJson.name = scopedAppName;
  pkgJson.dgraphInitMetadata = { initVersion: getVersion() };
  fs.writeJSONSync(path.join(projectDir, 'package.json'), pkgJson, {
    spaces: 2,
  });

  // update import alias in any generated files if not using the default

  if (!noInstall) {
    await installDependencies({ projectDir });
  }

  // Rename _eslintrc.json to .eslintrc.json - we use _eslintrc.json to avoid conflicts with the monorepos linter

  // fs.renameSync(path.join(projectDir, '_eslintrc.cjs'), path.join(projectDir, '.eslintrc.cjs'));

  if (!noGit) {
    await initializeGit(projectDir);
  }

  logNextSteps({ projectName: appDir, noInstall });

  process.exit(0);
};

main().catch(err => {
  logger.error('Aborting installation...');
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error('An unknown error has occurred. Please open an issue on github with the below:');
    console.log(err);
  }
  process.exit(1);
});
