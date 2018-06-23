import Seed from './'

// seed category
const seeder = new Seed('category')
seeder
  .clean()
  .then(() => {
    seeder
      .loadData()
      .build()
  })

// seed activity
seeder
  .loadData('activity')
  .clean()
  .then(() => {
    seeder.build()
  })
