import packageJson from '@/../package.json';

export const app = {
  name: packageJson.name,
  identifier: packageJson.name.toLowerCase(),
  version: packageJson.version,
};
