/**
 * @class
 * @description
 * Defines all the resolvers APIs
 * for activities
 */
class Category {
  /**
   * @constructor
   * @description
   * We want to initialize this class with an instance of
   * the firestore instance. this allows us to abstract the db
   * Although it doesn't change much as the entire app is tightly
   * coupled with firestore
   */
  constructor (db) {
    this.collection = db.collection('categories')
    this.limit = 10
  }

  async get (id) {
    try {
      const category = await this.collection.doc(id).get()
      if (category) {
        return category.exists
          ? Promise.resolve(category.data())
          : Promise.reject(new Error(`Category with id ${id} cannot be found`));
      }
    } catch (e) {
      return Promise.reject(new Error(`Error could not get category: ${e.message}`))
    }
  }
}

export default Category
