const { getJestProjects } = require('@nx/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/web',
    '<rootDir>/apps/api',
    '<rootDir>/libs/domain',
    '<rootDir>/libs/ui',
    '<rootDir>/libs/contracts',
    '<rootDir>/apps/admin'
  ]
};
