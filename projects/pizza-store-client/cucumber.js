let common = [
  'features/**/*.feature',                        // Specify our feature files
  '--require-module ts-node/register',            // Load TypeScript module
  '--require features/step-definitions/**/*.tsx', // Load step definitions
  '--require-module jsdom-global/register',       // Required for rendering the app inside steps
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common 
};