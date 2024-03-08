import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import sessionData from '../sessionData';
import { PATH } from '../config/routes';

const httpLink = createHttpLink({
	uri: PATH.GRAPH_API.path,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);

	//if (networkError) console.log(`[Network error]: ${networkError}`);
	if (networkError) {
		console.log(`[Network error]: ${JSON.stringify(networkError)}`);
		const statusCode = networkError['statusCode'];
		if (statusCode === 401) {
			//Token invalid or expired
			sessionData.logOut();
		}
	}
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = sessionData.jwToken;
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

export const client = new ApolloClient({
	link: link,
	cache: new InMemoryCache(),
});
