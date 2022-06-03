module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --max-warnings=0',
    'react-scripts test --bail --watchAll=false --findRelatedTests',
    () => 'tsc-files --noEmit',
  ],
};
