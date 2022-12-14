import { gql } from "@apollo/client";

const getProducts = gql`
    query getProductsByCategory($category: String!) {
        category(input: { title: $category }) {
            products {
                id
                name
                brand
                gallery
                inStock
                prices {
                    currency {
                        symbol
                    }
                    amount
                }
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`;

export default getProducts;
