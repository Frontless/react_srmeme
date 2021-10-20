import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import routes from "./routes";

const TOKEN = "token";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token) => {
	localStorage.setItem(TOKEN, token);
	isLoggedInVar(true);
};
export const logUserOut = () => {
	localStorage.removeItem(TOKEN);
	isLoggedInVar(false);
	window.location.replace(routes.home);
};
const uploadHttpLink = createUploadLink({
	uri: "http://localhost:5000/graphql",
});
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			token: localStorage.getItem(TOKEN),
		},
	};
});
const onErrorLink = onError((graphQLErrors, networkError) => {
	if (graphQLErrors) {
		console.log(`graphQLErrors`, graphQLErrors);
	}
	if (networkError) {
		console.log(`networkError`, networkError);
	}
});
export const client = new ApolloClient({
	link: authLink.concat(onErrorLink).concat(uploadHttpLink),
	cache: new InMemoryCache({
		typePolicies: {
			User: {
				keyFields: (obj) => `User:${obj.username}`,
			},
		},
	}),
});
