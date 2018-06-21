const Category = `
	type Category {
		# Unique identifier for category
		id: ID!
		# Name of the category
		name: String!
		# Category description
		description: String
		# Date the category was created
		createdAt: String
		# Date the category is updated
		updatedAt: String
		# List of all category that belongs to this category
		# Activities: [Activity]
	}
`

const Categories = `
	type Categories {
		Categories: [Category]
	}
`
export default [ Categories, Category ]