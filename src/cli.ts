import { Command } from 'commander';
import { DGRAPH_INIT, DEFAULT_APP_NAME } from './consts.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { validateAppName } from './utils/validateAppName.js';
import { logger } from './utils/logger.js';
import { getUserPkgManager } from './utils/getUserPkgManager.js';

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}
interface CliResults {
  appName: string;
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
  },
};
const promptAppName = async (): Promise<string> => {
  const { appName } = await inquirer.prompt<Pick<CliResults, 'appName'>>({
    name: 'appName',
    type: 'input',
    message: 'What will your database be called?',
    default: defaultOptions.appName,
    validate: validateAppName,
    transformer: (input: string) => {
      return input.trim();
    },
  });

  return appName;
};
const promptGit = async (): Promise<boolean> => {
  const { git } = await inquirer.prompt<{ git: boolean }>({
    name: 'git',
    type: 'confirm',
    message: 'Initialize a new git repository?',
    default: true,
  });

  if (git) {
    logger.success('Nice one! Initializing repository!');
  } else {
    logger.info('Sounds good! You can come back and run git init later.');
  }

  return git;
};

const promptInstall = async (): Promise<boolean> => {
  const pkgManager = getUserPkgManager();

  const { install } = await inquirer.prompt<{ install: boolean }>({
    name: 'install',
    type: 'confirm',
    message:
      `Would you like to install dependencies by running '${pkgManager}` +
      (pkgManager === 'yarn' ? `'?` : ` install'?`),
    default: true,
  });

  if (install) {
    logger.success("Alright. We'll install the dependencies for you!");
  } else {
    if (pkgManager === 'yarn') {
      logger.info(`No worries. You can run '${pkgManager}' later to install the dependencies.`);
    } else {
      logger.info(
        `No worries. You can run '${pkgManager} install' later to install the dependencies.`
      );
    }
  }

  return install;
};
const program = new Command().name(DGRAPH_INIT);

export const runCli = async () => {
  const cliResults = defaultOptions;

  program
    .description('A CLI for setting up a Dgraph database for devlopment')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create'
    )
    .description('A CLI for creating web applications with the t3 stack')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create'
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      '-y, --default',
      'Bypass the CLI and use all default options to bootstrap a new t3-app',
      false
    )
    .addHelpText(
      'afterAll',
      `\n The t3 stack was inspired by ${chalk
        .hex('#E8DCFF')
        .bold('@t3dotgg')} and has been used to build awesome fullstack applications like ${chalk
        .hex('#E24A8D')
        .underline('https://ping.gg')} \n`
    )
    .parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }
  cliResults.flags = program.opts();
  // .version(getVersion(), "-v, --version", "Display the version number");
  //   program.parse();

  try {
    if (process.env.TERM_PROGRAM?.toLowerCase().includes('mintty')) {
      logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are 
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal. Alternatively, you 
  can provide the arguments from the CLI directly: https://create.t3.gg/en/installation#experimental-usage to skip the prompts.`);

      const error = new Error('Non-interactive environment');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).isTTYError = true;
      throw error;
    }

    // if --CI flag is set, we are running in CI mode and should not prompt the user
    // if --default flag is set, we should not prompt the user
    if (!cliResults.flags.default) {
      if (!cliProvidedName) {
        cliResults.appName = await promptAppName();
      }
      if (!cliResults.flags.noGit) {
        cliResults.flags.noGit = !(await promptGit());
      }

      if (!cliResults.flags.noInstall) {
        cliResults.flags.noInstall = !(await promptInstall());
      }
    }
  } catch (err) {
    // If the user is not calling create-t3-app from an interactive terminal, inquirer will throw an error with isTTYError = true
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default t3 app
    // Otherwise we have to do some fancy namespace extension logic on the Error type which feels overkill for one line
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn(`
  ${DGRAPH_INIT} needs an interactive terminal to provide options`);

      const { shouldContinue } = await inquirer.prompt<{
        shouldContinue: boolean;
      }>({
        name: 'shouldContinue',
        type: 'confirm',
        message: `Continue scaffolding a default T3 app?`,
        default: true,
      });

      if (!shouldContinue) {
        logger.info('Exiting...');
        process.exit(0);
      }

      logger.info(`Bootstrapping a default T3 app in ./${cliResults.appName}`);
    } else {
      throw err;
    }
  }
  return cliResults;
};
