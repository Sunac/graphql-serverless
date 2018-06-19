import { makeExecutableSchema } from 'graphql-tools'

import Activity from './query/activity'

const RootQuery = `
  type RootQuery {
    activity(id: Int!): Activity
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    ...Activity
  ],
  resolvers: {
    RootQuery: {
      activity: () => ({
        id: 1,
        name: 'Enaho Murphy',
        price: 200,
        status: 'dd',
        duration: 33,
        availability: 1,
        spots: 22,
        spotsLeft: 2,
        address: 'sdjsdsnnd',
        startTime: 'dssd',
        endTime: 'adjsnsdmk'
      })
    }
  }
})
