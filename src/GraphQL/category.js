import { gql } from '@apollo/client';

const getAllCategories =  gql`
query {
  categories {
    name
  }
}
	`;

export { getAllCategories };