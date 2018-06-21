import Base from './base'
/**
 * @class
 * @description
 * Defines all the resolvers APIs
 * for activities. It extends the base class
 * that implements shared logic across services
 */
class Activity extends Base {
  /**
   * @constructor
   * @description
   * We want to initialize this class with the name of the
   * collection we want to interact with. this allows us to abstract
   * interaction with firestore.
   */
  constructor () {
    super('Activity')
  }
}

export default Activity
