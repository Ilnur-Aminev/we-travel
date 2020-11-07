// helper that grabs the mdx resolver when given a string fieldname
const mdxResolverPassthrough = fieldName => async (source, arguments_, context, info) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, arguments_, context, {
    fieldName
  });
  return result;
};

const customFieldResolver = fieldName => async (source, _, context) => {
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  });
  return mdxNode.frontmatter[fieldName];
};

// Define resolvers for custom fields
module.exports = ({ createResolvers }) => {
  createResolvers({
    Article: {
      excerpt: {
        resolve: mdxResolverPassthrough(`excerpt`)
      },
      body: {
        resolve: mdxResolverPassthrough(`body`)
      },
      type: {
        resolve: customFieldResolver('type')
      },
      seoTitle: {
        resolve: customFieldResolver('seoTitle')
      },
      geoUri: {
        resolve: customFieldResolver(`geoUri`)
      },
      seoDescription: {
        resolve: customFieldResolver('seoDescription')
      },
      timeToRead: {
        resolve: mdxResolverPassthrough(`timeToRead`)
      }
    }
  });
};
