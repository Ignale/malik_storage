import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const offsetFromCursor = (items, cursor, readField, type, length) => {
  if (cursor) {
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      if (readField("cursor", item) === cursor) {
        if (type === "before") {
          return i - length;
        }
        return i + 1;
      }
    }
  }
  return -1;
};

//[][][][][][][][][][][][][][][]
//           ^             ^
//         offset        before

const client = new ApolloClient({
  uri: "https://malik-brand.com/graphql",
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // products: relayStylePagination(),
          products: {
            merge(
              prev = { pageInfo: {}, edges: [] },
              curr,
              { args: { before, after, first, last }, readField, mergeObjects }
            ) {
              // const result = {
              //   pageInfo: mergeObjects(existing.pageInfo, incoming.pageInfo),
              //   edges: existing.edges.slice(0),
              // };

              // if (!incoming.edges) {
              //   return result;
              // }

              // result.edges.push(...incoming.edges);

              // return result;
              const merged = prev?.edges ? prev?.edges.slice(0) : []; //create new array identical to prev since it is unmutable

              let cursor = before ?? after ?? null;

              let type = after ? "after" : "before";

              let length = first ?? last;

              let offset = offsetFromCursor(
                merged,
                cursor,
                readField,
                type,
                length
              );

              if (offset < 0) offset = 0;

              for (let i = 0; i < length; i++) {
                if (curr.edges[i]) {
                  merged[offset + i] = curr.edges[i];
                }
              }
              return {
                edges: [...merged],
                pageInfo: curr.pageInfo,
              };
            },
            read(
              existing,
              { args: { before, after, first, last }, readField }
            ) {
              console.log("read");
              let cursor = before ?? after ?? null;
              let type = first ? "after" : "before";

              if (
                !existing ||
                readField("cursor", existing.edges.at(-1)) === after
              ) {
                return undefined;
              }

              let length = first ?? last;

              const items = existing.edges ? existing.edges.slice(0) : [];

              let offset = offsetFromCursor(
                items,
                cursor,
                readField,
                type,
                length
              );
              console.log(offset, "offset");
              if (offset < 0) offset = 0;
              const newItems = items.slice(offset, offset + length);

              console.log(existing, "existing");
              // console.log(type, "type");
              // console.log(
              //   readField("cursor", existing.edges.slice(-1)),
              //   "cursor "
              // );
              console.log({ before, after, first, last }, "args");

              // console.log(items, "items");
              // console.log(newItems, "newItems");

              let hasNextPage = existing.edges.length >= offset + (first ?? 0);

              let hasPreviousPage = !(offset === 0);

              // console.log(existing.edges.length, "existing.edges.length");

              // console.log(cursor, "cursor");
              // console.log(hasNextPage, "hasNextPage");
              // console.log(hasPreviousPage, "hasPreviousPage");
              // console.log(first, "first");

              if (newItems.length === 0) {
                return existing;
              }

              return {
                edges: [...newItems],
                // pageInfo: existing.pageInfo,
                pageInfo: {
                  hasPreviousPage,
                  hasNextPage,
                  endCursor: existing.pageInfo.endCursor,
                  startCursor: existing.pageInfo.startCursor,
                  // endCursor: readField("cursor", newItems.at(-1)),
                  // startCursor: readField("cursor", newItems.at(0)),
                },
              };
            },
            keyArgs: false, //используется для разделения списков кэшируемых данный по аргументам запроса
          },
        },

        // keyFields: [
        //   "sku",
        //   "key",
        //   "databaseId",
        //   "price",
        //   "stockQuantity",
        //   "name",
        //   "id",
        // ],
      },
    },
  }),
});

export { client };
