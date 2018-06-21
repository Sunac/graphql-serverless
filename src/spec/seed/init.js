import Seed from './'

// seed category
const seeder = new Seed('category')
seeder.build()

// seed activity
seeder
  .setCollection('activity')
  .loadData('activity')
  .build()
