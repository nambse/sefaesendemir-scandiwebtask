import { gql } from "@apollo/client";

const getAllCurrencies = gql`
	query {
		currencies {
			label
			symbol
		}
	}
`;

export default getAllCurrencies;