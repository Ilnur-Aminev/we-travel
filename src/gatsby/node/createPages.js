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

  const authors = getUniqueListBy(sourceData.authors, 'name');
  const articles = sourceData.articles.sort(byDate).map(article => {
    const articleAuthor = authors.find(author => author.name.toLowerCase() === article.author.toLowerCase());
    if (articleAuthor == null) {
      throw new Error(`
      We could not find the Author for: "${article.title}".
      Double check the author field is specified in your post and the name
      matches a specified author.
      Provided author: ${article.author}
      ${error}
    `);
    }
    article.slug = `${articleAuthor.slug}${article.slug}/`;
    article.author = { ...articleAuthor, slug: `${articleAuthor.slug}/` };
    return article;
  });

  authors.forEach(author => {
    author.slug += '/';
  });

  if (articles.length === 0 || authors.length === 0) {
    throw new Error(`
    You must have at least one Author and Post.
  `);
  }

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

  log('Creating', 'article posts');
  const meta = await graphql(query.meta);
  articles.forEach(article => {
    const otherArticlesFromSameAuthor = articles.filter(
      a => a.author.name.toLowerCase() === article.author.name.toLowerCase() && a.id !== article.id
    );

    let next = [];
    const length = otherArticlesFromSameAuthor.length;
    if (length <= 2) {
      next = otherArticlesFromSameAuthor;
    } else {
      const begin = Math.floor(Math.random() * (length - 2));
      next = otherArticlesFromSameAuthor.slice(begin, begin + 2);
    }

    const regionGeoUris = otherArticlesFromSameAuthor
      .filter(a => !!a.geoUri)
      .map(({ title, geoUri, slug, hero, excerpt }) => ({
        title,
        geoUri,
        slug,
        hero: hero.narrow,
        excerpt
      }));

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        basePath,
        permalink: `${meta.data.site.siteMetadata.siteUrl}${article.slug}`,
        slug: article.slug,
        id: article.id,
        title: article.title,
        canonicalUrl: article.canonical_url,
        next,
        regionGeoUris
      }
    });
  });

  log('Creating', 'authors page');

  authors.forEach(author => {
    const articlesTheAuthorHasWritten = articles.filter(
      article => article.author.name.toLowerCase() === author.name.toLowerCase()
    );
    createPaginatedPages({
      edges: articlesTheAuthorHasWritten,
      pathPrefix: author.slug,
      createPage,
      pageLength,
      pageTemplate: templates.author,
      buildPath: buildPaginatedPath,
      context: {
        author,
        originalPath: author.slug,
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
