// import simpleGit from 'simple-git';

/*
 * Run some checks before commiting
 */
(async () => {
  console.log('\nRunning pre-commit script\n');
  // const git = simpleGit();
  // const status = await git.status();
  /*
   * No precommit checks to run right now
   * To access git use above commented out code
   */
  let errors = [];
  for (const error of errors) {
    console.warn(`🚨 ${error}`);
  }
  if (errors.length) {
    throw '⛔️ Please fix pre-commit errors \n';
  } else {
    console.log('✅ Pre-commit success \n');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
