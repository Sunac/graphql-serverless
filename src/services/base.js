import { database } from '../utils/firebase'

/**
 * @class
 * @description
 * Defines all shared resolvers APIs
 * for accessing firestore
 */
class Base {
  /**
   * @constructor
   * @description
   * We want to initialize this class with an instance of
   * the firestore instance. this allows us to abstract the db
   * Although it doesn't change much as the entire app is tightly
   * coupled with firestore
   * @param {String} collectionName name of the collection we want
   * to interact with
   */
  constructor (collectionName) {
    this.collection = database.collection(collectionName.toLowerCase())
    this.collectionName = collectionName
  }

  /**
   * @description
   * Gets a single category by id
   * @param {String} id of the category string
   */
  async get (id) {
    try {
      const collection = await this.collection.doc(id).get()
      if (collection) {
        return collection.exists
          ? Promise.resolve(collection.data())
          : Promise.reject(new Error(`${this.collectionName} with id ${id} cannot be found`))
      }
    } catch (e) {
      return Promise.reject(new Error(`Error could not get category: ${e.message}`))
    }
  }
}

export default Base
