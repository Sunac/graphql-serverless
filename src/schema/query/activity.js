const Activity = `
	type Activity {
		# Unique activity identifier
		id: ID!
		# Name of the activity to be held
		name: String!
		# activity description. 
		# Should hold details of the activities to be held
		description: String
		# Image url of the place the activity is to be held
		image: String
		# Thumbnail of the image url.
		# This would be used to render activity list if needed
		thumbnail: String
		longitude: String
		latitude: String
		# Cost of the activity
		price: Int!
		# identify if the activity is active or not
		status: String!
		# Time length of the activity
		duration: Int!
		# Comma separated tags
		tags: String
		# Identifies if the activity is available
		availability: Int!
		# Shows how many spots are available for this activity
		spots: Int!
		# Shows how many spots are left to be filled
		spotsLeft: Int!
		# Location where the activity will take place
		address: String!
		startTime: String!
		endTime: String!
		startDate: String
		endDate: String
		createdAt: String
		updatedAt: String
		categoryID: String
	}
`

const Activities = `
	type Activities {
		Activities: [Activity]!
	}
`

export default [ Activity, Activities ]
