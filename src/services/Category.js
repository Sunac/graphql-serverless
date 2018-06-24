import Base from './Base'
/**
 * @class
 * @description
 * Defines all the resolvers APIs
 * for category. It extends the base class
 * that implements shared logic across services
 */
class Category extends Base {
  /**
   * @constructor
   * @description
   * We want to initialize this class with the name of the
   * collection we want to interact with. this allows us to abstract
   * interaction with firestore.
   */
  constructor () {
    super('Category')
  }

  /**
   * @method
   * @description
   * We want to get all categories
   * @param {Integer} limit
   * @param {Integer} page
   * @param {String} sort
   * @param {String} orderBy
   *
   * @returns {Promise} returns a promise
   */
  async list ({ limit = 10, page = 0, sort = 'desc', orderBy = 'name' }) {
    try {
      const categories = await this.collection
      // We need to decide if we really need pagination on
      // categories.
      // .orderBy(orderBy, sort)
      // .limit(limit)
      // .startAt(1)
        .get()

      categories
        .forEach((doc) => this.setResult(doc.data()))

      return this.getResult()
    } catch (e) {
      return Promise
        .reject(new Error(`Error getting ${this.collectionName.toLowerCase()}: ${e.message}`))
    }
  }
}

export default Category
