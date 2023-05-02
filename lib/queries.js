import { gql } from '@apollo/client'

export const ALL_PRODUCTS_QUERY = gql`
query QueryProducts {
  products(last: 100) {
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
      }
    }
  }
}
`
export const ALL_PRODUCTS_CATEGORIES = gql`
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
export const ALL_CVET = gql`
query QueryProductCvet {
   allPaCvet(last: 100, first: 0) {
    nodes {
      databaseId
      id
      name
    }
  }
}
`
export const ALL_SIZES = gql`
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