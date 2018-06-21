const RootQuery = `
  type RootQuery {
    category(id: String!): Category
    activity(id: String!): Activity
  }
`

export default RootQuery
