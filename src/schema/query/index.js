const RootQuery = `
  type RootQuery {
    activity(id: String!): Activity
    activities(
			categoryID: String,
			gtPrice: Int,
			ltPrice: Int,
			gtDuration: Int,
			ltDuration: Int,
			startDate: String,
			endDate: String,
			availability: Boolean,
			spotsLeft: Int
		): [Activity]
    category(id: String!): Category
    categories: [Category]
  }
`

export default RootQuery
