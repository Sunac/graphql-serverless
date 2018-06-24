import Base from './Base'

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
   *
   * @returns {Void} returns void
   */
  constructor () {
    super('Activity')
    this.filters = {}
    this.activities = []
  }

  /**
   * @description
   * filterActivityByStartAndEnd filters activities by
   * Start and end date
   * @param {String} startDate activity start date
   * @param {String} endDate activity end date
   * @example StartDate `2010-01-11` - `yy-mm-dd`
   * @example endDte    `2018-01-11` - `yy-mm-dd`
   *
   * @returns {Object} returns object instance
   */
  filterActivityByStartAndEnd (startDate, endDate) {
    if (startDate && endDate) {
      this.filterDatesBetween('startDate', 'endDate', startDate, endDate)
    } else {
      if (startDate) {
        this.filterDateGreaterOrEqual('startDate', startDate)
      }
      if (endDate) {
        this.filterDateLesserOrEqual('endDate', endDate)
      }
    }

    return this
  }

  /**
   * @description
   * filterActivityByDuration filters activities by duration
   * @param {String} gtDuration duration greater or equal to i.e 2
   * @param {String} ltDuration duration lesser or equal to i.e 10
   *
   * @returns {Void} returns void

   */
  filterActivityByDuration (gtDuration, ltDuration) {
    if (gtDuration && ltDuration) {
      this.filterBetween('duration', gtDuration, ltDuration)
    } else {
      if (gtDuration) {
        this.filterGreaterOrEqual('duration', gtDuration)
      }

      // we want to filter activity by endDate
      if (ltDuration) {
        this.filterLessOrEqual('duration', ltDuration)
      }
    }

    return this
  }
  /**
  * @description
  * filterBySpotsLeft filters activities by spots left
  * @param {String} spotsLeft sports greater or equal to i.e 12
  *
  * @returns {Object} returns object instance
  */
  filterBySpotsLeft (spotsLeft) {
    if (spotsLeft) {
      this.filterGreaterOrEqual('spotsLeft', spotsLeft)
    }

    return this
  }

  /**
   * @description
   * This method handles querying of activity data
   * Because we are going to be filtering the data we're getting
   * by allowing the user for filter base on these categories
   * @param {String} categoryID we want to filter by category
   * @param {Integer} gtPrice we want to filter activity base on price
   * greater or equal to a specified amount
   * @param {Integer} ltPrice we want to filter activity base on price
   * greater or equal to a specified amount
   * @param {Integer} gtDuration we want to filter activity base on duration
   * greater or equal to a specified time
   * @param {Integer} ltDuration we want to filter activity base on duration
   * lesser or equal to a specified time
   * @param {String} city, we activities for a specific city
   * @param {String} startDate, we activities that starts from a specific date
   * @param {String} endDate, we activities that ends from a specific date
   * @param {String} spotsLeft, we want to filter by activities that has a minimum sport left
   * @param {String} availability, we want to filter by activities that is available
   *
   * @returns {Promise} returns promise
   */
  async list ({
    categoryID,
    gtPrice,
    ltPrice,
    gtDuration,
    ltDuration,
    city,
    tags,
    startDate,
    endDate,
    spotsLeft,
    availability
  }) {
    try {
      let query = this.collection
      // we want to do as much query with firestore and
      // leave the rest to lodash
      query = query.where('availability', '==', availability || true)

      // we want to filter activities by categoryID
      if (categoryID) {
        query = query.where('categoryID', '==', categoryID)
      }

      // we want to filter activities by city
      if (city) {
        query = query.where('city', '==', city)
      }

      // we want to filter activity by startDate
      if (gtPrice) {
        query = query.where('price', '>=', gtPrice)
      }
      // we want to filter activity by startDate
      if (ltPrice) {
        query = query.where('price', '<=', ltPrice)
      }

      const snapshot = await query.get()

      // we want to get all data.
      snapshot.forEach((doc) => this.results.push(doc.data()))

      // firestore limits queries on multiple fields with <>
      // so we're going to use lodash to achieve that our selves
      // before sending the final result set
      return this
        .filterActivityByDuration(gtDuration, ltDuration)
        .filterActivityByStartAndEnd(startDate, endDate)
        .filterBySpotsLeft(spotsLeft)
        .applyFilter()
        .getResult()
    } catch (e) {
      return Promise
        .reject(new Error(`Error getting ${this.collectionName.toLowerCase()}: ${e.message}`))
    }
  }
}

export default Activity
