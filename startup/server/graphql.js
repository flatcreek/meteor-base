import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import schema from './api';

const app = express();
const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
  uploads: false,
});

await server.start();

app.use('/graphql',
  cors,
  json(),
  expressMiddleware(server, {
    app: WebApp.connectHandlers,
    context: async ({ req }) => ({
      user: await getUser(req.headers.authorization),
    }),
  }),
);
