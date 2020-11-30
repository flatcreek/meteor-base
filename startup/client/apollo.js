/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { MeteorAccountsLink } from 'meteor/apollo';

const httpUrl = Meteor.settings.public.graphQL && Meteor.settings.public.graphQL.httpUri;

const omitTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename); // eslint-disable-line no-param-reassign
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`),
    );

  if (networkError) {
    console.warn(`[Network error]: ${networkError}`);
  }
});

const httpLink = ApolloLink.from([
  omitTypeName,
  MeteorAccountsLink(),
  errorLink,
  new HttpLink({
    uri: httpUrl || '/graphql',
    credentials: 'same-origin',
  }),
]);

const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([MeteorAccountsLink(), errorLink, httpLink]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

export default apolloClient;
