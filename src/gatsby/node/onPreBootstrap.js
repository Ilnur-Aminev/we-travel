const fs = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = async ({ reporter }) => {
  const authorsPath = 'content/authors';
  const postsPath = 'content/posts';

  if (!fs.existsSync(authorsPath)) {
    reporter.warn(`
      Missing directory for Authors.
      We are creating the "${authorsPath}" directory for you.
      Please ensure you add your authors within "${authorsPath}"
    `);

    fs.mkdirSync(authorsPath, { recursive: true });
  }

  if (!fs.existsSync(postsPath)) {
    reporter.warn(`
      Missing directory for Posts.
      We are creating the "${postsPath}" directory for you.
      Please ensure you add your posts within "${postsPath}"
    `);

    fs.mkdirSync(postsPath, { recursive: true });
  }
};
