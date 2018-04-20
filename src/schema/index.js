import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

// schema
const welcome = new GraphQLObjectType({
  name: 'PassportMauritius',
  fields: {
    name: { type: GraphQLString },
    message: { type: GraphQLString }
  }
})

// resolver
const getWelcome = (parent, args) => ({
  name: 'Passport Mauritius',
  message: 'Welcome to Passport Mauritius'
})

// mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: welcome,
      resolve () {
        return Promise.resolve()
      }
    }
  }
})

// query
const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    welcome: {
      type: welcome,
      resolve: getWelcome
    }
  }
})

export default new GraphQLSchema({
  query,
  mutation
})
