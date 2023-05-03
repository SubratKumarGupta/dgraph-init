// import { type PkgInstallerMap } from "~/installers/index.js";
import path from 'path';
// import { scaffoldProject } from "~/helpers/scaffoldProject.js";
// import { selectAppFile, selectIndexFile } from "~/helpers/selectBoilerplate.js";
import { getUserPkgManager } from '../utils/getUserPkgManager.js';
import { scaffoldProject } from './scaffoldProject.js';

interface CreateProjectOptions {
  projectName: string;
  noInstall: boolean;
}

export const createProject = async ({ projectName, noInstall }: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);
  console.log(projectDir);

  scaffoldProject({ projectName, noInstall, pkgManager, projectDir });
  // Bootstraps the base Next.js application

  return projectDir;
};
