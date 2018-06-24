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
}

export default Category
