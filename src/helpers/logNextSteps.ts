import { DEFAULT_APP_NAME } from '../consts.js';
import { PackageManager, getUserPkgManager } from '../utils/getUserPkgManager.js';
import { logger } from '../utils/logger.js';

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  projectName?: string;
}

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = ({
  projectName = DEFAULT_APP_NAME,
  noInstall,
}: Pick<InstallerOptions, 'projectName' | 'noInstall'>) => {
  const pkgManager = getUserPkgManager();

  logger.info('Next steps:');
  projectName !== '.' && logger.info(`  cd ${projectName}`);
  if (noInstall) {
    // To reflect yarn's default behavior of installing packages when no additional args provided
    if (pkgManager === 'yarn') {
      logger.info(`  ${pkgManager}`);
    } else {
      logger.info(`  ${pkgManager} install`);
    }
  }

  logger.info(`  ${pkgManager === 'npm' ? 'npm run' : pkgManager} dev`);
};
