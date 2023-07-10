import { gql } from '@apollo/client';

const getCharacters = gql`
	query ($page: Int!) {
		characters(page: $page) {
			results {
				id
				name
				status
				species
				type
				gender
				origin {
					name
				}
				location {
					name
				}
				image
				episode {
					id
					name
				}
				created
			}
		}
	}
`;

export default getCharacters;
