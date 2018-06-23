import { database } from '../../utils/firebase'

class Seed {
  /**
   * @description
   * We want to be able to specify a default
   * collection to seed when initiating the
   * seed class
   * @param {String} collectionName the name of the collection
   * to seed
   */
  constructor (collectionName) {
    this.collectionName = collectionName
    this.collection = database.collection(collectionName)
  }

  /**
   * @description
   * LoadData method helps import the seed data from
   * the data folder. If this param is not supplied, the method
   * will automatically look for a json file in the data folder
   * matching the collection name and load that.
   * @param {String} fileName name of the file to load.
   * @returns {Object} returns the seed object instance.
   */
  loadData (fileName) {
    fileName = fileName || this.collectionName
    this.data = require(`../data/${fileName}.json`)
    return this
  }

  /**
   * @description
   * setCollection method sets the collection that
   * needs to be seeded.
   * @param {String} collectionName name of the collection to set
   * @returns {Object} returns the seed object instance.
   */
  setCollection (collectionName) {
    if (collectionName) {
      this.collection = database.collection(collectionName)
      this.collectionName = collectionName
    }
    return this
  }

  /**
   * @description
   * wipes collection that is currently set. This method
   * would clean the entire database, So it must ne used with
   * care
   * @return {Object} returns object instance
   */
  async clean (batchSize = 40) {
    const query = this.collection.orderBy('__name__').limit(batchSize)

    const snapshot = await query.get()
    // When there are no documents left, we are done
    if (!snapshot.size) {
      return 0
    }

    // Delete documents in a batch
    const batch = database.batch()
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    const batchRemaining = batch.commit()

    if (batchRemaining.size === 0) {
      return
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.clean(batchSize)
    })
  }

  /**
   * @description
   * This method seeds the database
   * when supplied with the fileName and collection
   * It used the fileName passed to load the data to be seeded
   * If the collection name is passed, that is th collection that
   * would be seeded. If none is passed, ith defaults to the name and
   * data of that instance
   * @param {String} fileName name of the file to load.
   * @param {String} collectionName name of the collection to set
   */
  async build (fileName, collectionName) {
    try {
      const promises = this.loadData(fileName)
        .setCollection(collectionName)
        .data
        .map((dataset) => {
          this.collection.doc(dataset.id).set(Object.assign({ testTime: new Date()}))
        })
      await Promise.all(promises)
    } catch (e) {
      throw (new Error(e))
    }
  }
};

export default Seed
