import { database } from '../../utils/firebase'
/**
 * @class
 * @description
 * Implements specific methods tha allows us seed
 * firestore database
 */
class Seed {
  /**
   * @constructor
   * @description
   * constructorWe want to be able to specify a default
   * collection to seed when initiating the
   * seed class
   * @param {String} collectionName the name of the collection
   * to seed
   * @returns {Void} returns void
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
   * formatDataTime converts the string time to a Date object
   * this allows us set any date type to type timeStamp on
   * firestore
   * @returns {Object} returns the seed object instance.
   */
  formatDataTime () {
    this.data = this.data.map((dataset) => {
      for (const key in dataset) {
        const regex = /(time)|(edAt)|(Date)$/i
        if (regex.test(key)) {
          dataset[key] = new Date(dataset[key])
        }
        if (key === 'availability') {
          dataset['availability'] = !!dataset['availability']
        }
      }
      return dataset
    })

    return this
  }

  /**
   * @description
   * getData gets dummy data to seed
   * @return {Array} array of dataset
   */
  getData () {
    return this.data
  }

  /**
   * @description
   * setCollection method sets the collection that
   * needs to be seeded.
   * @param {String} collectionName name of the collection to set
   * @returns {Object} returns the seed object instance.
   */
  setCollection (collectionName) {
    this.collectionName = collectionName || this.collectionName
    this.collection = database.collection(this.collectionName)

    return this
  }

  /**
   * @description
   * wipes collection that is currently set. This method
   * would clean the entire database, So it must ne used with
   * care
   * @param {Integer} batchSize batch you want delete to occur
   * @return {Object} returns object instance
   */
  async clean (batchSize = 1000) {
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
   *
   * @returns {Promise} returns a promise
   */
  async build (fileName, collectionName) {
    const promises = this
      .setCollection(collectionName)
      .loadData(fileName)
      .formatDataTime()
      .getData()
      .map((dataset) => {
        this.collection.doc(dataset.id).set(dataset)
      })
    await Promise.all(promises)
  }
};

export default Seed
