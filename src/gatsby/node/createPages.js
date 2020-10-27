/* eslint-disable no-console, import/no-extraneous-dependencies, prefer-const, no-shadow */
const path = require('path');
const createPaginatedPages = require('gatsby-paginate');
require('dotenv').config();

const templatesDirectory = path.resolve(__dirname, '../../templates');
const templates = {
  articles: path.resolve(templatesDirectory, 'articles.template.tsx'),
  article: path.resolve(templatesDirectory, 'article.template.tsx'),
  author: path.resolve(templatesDirectory, 'author.template.tsx')
};

const query = require('../data/data.query');
const normalize = require('../data/data.normalize');

module.exports = async ({ actions: { createPage }, graphql }) => {
  const pageLength = 6;
  const basePath = '/';

  const sourceData = {
    authors: [],
    articles: []
  };

  try {
    log('Querying Authors & Articles source:', 'Local');
    const localAuthors = await graphql(query.authors);
    const localArticles = await graphql(query.articles);

    sourceData.authors = localAuthors.data.authors.edges.map(normalize.authors);
    sourceData.articles = localArticles.data.articles.edges.map(normalize.articles);
  } catch (error) {
    console.error(error);
  }

  const articles = sourceData.articles.sort(byDate);
  const authors = getUniqueListBy(sourceData.authors, 'name');

  if (articles.length === 0 || authors.length === 0) {
    throw new Error(`
    You must have at least one Author and Post.
  `);
  }

  /**
   * Once we've queried all our data sources and normalized them to the same structure
   * we can begin creating our pages. First, we'll want to create all main articles pages
   * that have pagination.
   * /articles
   * /articles/page/1
   * ...
   */
  log('Creating', 'articles page');
  createPaginatedPages({
    edges: articles,
    pathPrefix: basePath,
    createPage,
    pageLength,
    pageTemplate: templates.articles,
    buildPath: buildPaginatedPath,
    context: {
      authors,
      basePath,
      skip: pageLength,
      limit: pageLength
    }
  });

  /**
   * Once the list of articles have bene created, we need to make individual article posts.
   * To do this, we need to find the corresponding authors since we allow for co-authors.
   */
  log('Creating', 'article posts');
  const meta = await graphql(query.meta);
  articles.forEach((article, index) => {
    const author = authors.find(a => a.name.toLowerCase() === article.author.toLowerCase());
    if (author == null) {
      throw new Error(`
      We could not find the Author for: "${article.title}".
      Double check the author field is specified in your post and the name
      matches a specified author.
      Provided author: ${article.author}
      ${error}
    `);
    }
    /**
     * We need a way to find the next artiles to suggest at the bottom of the articles page.
     * To accomplish this there is some special logic surrounding what to show next.
     */
    let next = articles.slice(index + 1, index + 3);
    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articles.slice(0, 2);
    // If there's 1 item in the list, grab the first article
    if (next.length === 1 && articles.length !== 2) next = [...next, articles[0]];
    if (articles.length === 1) next = [];

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        author,
        basePath,
        permalink: `${meta.data.site.siteMetadata.siteUrl}${article.slug}/`,
        slug: article.slug,
        id: article.id,
        title: article.title,
        type: article.type,
        seoDescription: article.seoDescription,
        seoTitle: article.seoTitle,
        canonicalUrl: article.canonical_url,
        next
      }
    });
  });

  log('Creating', 'authors page');

  authors.forEach(author => {
    const articlesTheAuthorHasWritten = articles.filter(
      article => article.author.toLowerCase() === author.name.toLowerCase()
    );
    const path = slugify(author.slug, 'places');

    createPaginatedPages({
      edges: articlesTheAuthorHasWritten,
      pathPrefix: author.slug,
      createPage,
      pageLength,
      pageTemplate: templates.author,
      buildPath: buildPaginatedPath,
      context: {
        author,
        originalPath: path,
        skip: pageLength,
        limit: pageLength
      }
    });
  });
};

// ///////////////// Utility functions ///////////////////

function buildPaginatedPath(index, basePath) {
  return index > 1 ? `${basePath}page/${index}` : basePath;
}

function slugify(string, base) {
  const slug = string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${base}/${slug}`.replace(/\/\/+/g, '/');
}

function getUniqueListBy(array, key) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

function byDate(a, b) {
  return new Date(b.dateForSEO) - new Date(a.dateForSEO);
}

// ///////////////////////////////////////////////////////

function log(message, section) {
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);
}
