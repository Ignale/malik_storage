import { gql } from "@apollo/client";

const ALL_PRODUCTS_QUERY = gql`
  query QueryProducts(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    products(first: $first, last: $last, before: $before, after: $after) {
      nodes {
        ... on VariableProduct {
          id
          name
          sku
          link
          databaseId
          productCategories {
            nodes {
              name
              databaseId
            }
          }
          variations(first: 20) {
            nodes {
              name
              databaseId
              stockQuantity
              stockStatus
              sku
              link
              metaData {
                key
                value
              }
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                }
              }
              price(format: RAW)
              manageStock
              id
              databaseId
            }
          }
          productId
          link
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
const ALL_PRODUCTS_CATEGORIES = gql`
  query QueryProductCategories {
    productCategories(last: 100, first: 0) {
      nodes {
        id
        name
        databaseId
      }
    }
  }
`;
const ALL_CVET = gql`
  query QueryProductCvet {
    allPaColor(last: 100, first: 0) {
      nodes {
        databaseId
        id
        name
      }
    }
  }
`;
const ALL_SIZES = gql`
  query QueryProductSizes {
    allPaSize(last: 100, first: 0) {
      nodes {
        databaseId
        id
        name
      }
    }
  }
`;
export { ALL_SIZES, ALL_CVET, ALL_PRODUCTS_CATEGORIES, ALL_PRODUCTS_QUERY };
