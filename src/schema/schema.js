import { makeExecutableSchema } from 'graphql-tools'

// graphql schema
import Category from './query/category'
import RootQuery from './query'

// firestore APIS
import { category } from '../services'

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    ...Category
  ],
  resolvers: {
    RootQuery: {
      category: (_, { id }) => category.get(id)
    }
  }
})
