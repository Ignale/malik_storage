import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const offsetFromCursor = (items, cursor, readField) => {
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    if (readField("id", item) === cursor) {
      return i + 1;
    }
  }
  return -1;
};

const client = new ApolloClient({
  uri: "https://malik-brand.com/graphql",
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products:
            // relayStylePagination()
            {
              keyArgs: false,
              // read(prev, {args: {first, last, after, before}}) {
              //   console.log('read')
              //   console.log(args)

              // },
              merge(
                prev,
                curr,
                { args: { first, last, after, before }, readField }
              ) {
                console.log("merge");
                console.log(curr);
                const merged = prev ? [...prev.nodes] : [];
                return {
                  nodes: [...merged, ...curr.nodes],
                  pageInfo: curr.pageInfo,
                };
              },
            },
        },
        keyFields: [
          "sku",
          "key",
          "databaseId",
          "price",
          "stockQuantity",
          "name",
          "id",
        ],
      },
    },
  }),
});

export { client };
