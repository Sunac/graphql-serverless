import Seeder from './Seeder'

/**
 * @class
 * Seed class implements a run method
 * that seeds firestore database
 */
class Seed {
  /**
   * @description
   * We want to seed the necessary collection
   * with the dummy data we created. this requires
   * a dummy json data matching the collection name in
   * the data folder
   * @param {Array} collections this is an array of the
   * collection to seed
   * @returns {Promise}
   */
  static async run (collections = ['activity', 'category']) {
    const promises = collections
      .map(async (collection) => {
        const seeder = new Seeder(collection)
        // await seeder
        //   .clean()
        await seeder.build()
      })
    return Promise.all(promises)
  }
}
Seed.run()
// .then(() => process.exit(0))

export default Seed
