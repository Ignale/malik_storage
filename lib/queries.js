const { gql } = require('@apollo/client')

const ALL_PRODUCTS_QUERY = gql`
query QueryProducts {
  products(first: 100) {
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
        variations {
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
  }
}
`
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
`
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
`
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
`
module.exports = { ALL_SIZES, ALL_CVET, ALL_PRODUCTS_CATEGORIES, ALL_PRODUCTS_QUERY }