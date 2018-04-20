import 'babel-polyfill'
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda'
import lambdaPlayground from 'graphql-playground-middleware-lambda'
// import { makeExecutableSchema } from 'graphql-tools'

import GraphQLSchema from './schema/index'

export function graphqlHandler (event, context, callback) {
  function callbackFilter (error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*'
    callback(error, output)
  }
  const handler = graphqlLambda({ schema: GraphQLSchema, tracing: true })
  return handler(event, context, callbackFilter)
}

export const playgroundHandler = lambdaPlayground({
  endpoint: process.env.GRAPHQL_ENDPOINT
    ? process.env.GRAPHQL_ENDPOINT
    : '/production/graphql'
})

export const graphiqlHandler = graphiqlLambda({
  endpointURL: process.env.GRAPHQL_ENDPOINT
    ? process.env.GRAPHQL_ENDPOINT
    : '/production/graphql'
})
