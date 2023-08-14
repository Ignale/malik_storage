const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: "https://malik-brand.com/graphql",
  cache: new InMemoryCache(),
});

module.exports = { client }