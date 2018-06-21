const RootQuery = `
  type RootQuery {
    category(id: String!): Category
    activity(id: String!): Activity
    activities(
      categoryID: String,
      price: Int,
      duration: Int,
      spots: Int,
      date: String,
    ):  Activities
  }
`

export default RootQuery
