import { database } from '../utils/firebase'
import _ from 'lodash'

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
    this.results = []
    this.filters = {}
    this._ = _
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
      return Promise
        .reject(new Error(`Error could not get ${this.collectionName.toLowerCase()}: ${e.message}`))
    }
  }

  async create (data) {
    try {
      await this.collection.add(data)
    } catch (e) {
      return Promise
        .reject(new Error(`Error could create ${this.collectionName.toLowerCase()}: ${e.message}`))
    }
  }

  getResult () {
    return this.results
  }
  /**
   * @description
   * filterGreaterOrEqual filters a result set base
   * if the value of the property is greater or equal
   * to the rule
   * @param {String} property this is the property of the object
   * to filter on
   * @param {Number} rule the value to evaluate on
   *
   * @return {Object} returns the object instance
   */
  filterGreaterOrEqual (property, rule) {
    this.filters[property] = value => (value >= rule)

    return this
  }

  /**
   * @description
   * filterLessOrEqual filters a result set base
   * if the value of the property is less or equal to the rule
   * @param {String} property this is the property of the object
   * to filter on
   * @param {Number} rule the value to evaluate on
   *
   * @return {Object} returns the object instance
   */
  filterLessOrEqual (property, rule) {
    this.filters[property] = value => value <= rule

    return this
  }

  /**
   * @description
   * filterBetween filters a result set base
   * on two rules. It evaluates a simple logic, Is ruleOne
   * greater or equal to the value and is ruleTwo lesser or equal to
   * the value to the rule
   * @param {String} property this is the property of the object
   * to filter on
   * @param {Number} ruleOne the value to evaluate on greater
   * @param {Number} ruleTwo the value to evaluate on lesser
   *
   *  @return {Object} returns the object instance
   */
  filterBetween (property, ruleOne, ruleTwo) {
    this.filters[property] = value => (value >= ruleOne && value <= ruleTwo)

    return this
  }

  /**
   * @description
   * filterDateGreaterOrEqual filters a result set base on date
   * It checks if the date {rule} is greater or equal to the value
   * been evaluated on. We do this by converting the value date and
   * the rule date to timeStamp.
   * @param {String} property this is the property of the object
   * to filter on
   * @param {String} rule the value to evaluate on greater
   *
   * @return {Object} returns the object instance
   */
  filterDateGreaterOrEqual (property, rule) {
    this.filters[property] = value =>
      (new Date(value).getTime() >= new Date(rule).getTime())

    return this
  }

  /**
   * @description
   * filterDateLesserOrEqual filters a result set base on date
   * It checks if the date {rule} is less or equal to the value
   * been evaluated on. We do this by converting the value date and
   * the rule date to timeStamp.
   * @param {String} property this is the property of the object
   * to filter on
   * @param {String} rule the value to evaluate on greater
   *
   * @return {Object} returns the object instance
   */
  filterDateLesserOrEqual (property, rule) {
    this.filters[property] = value =>
      new Date(value).getTime() <= new Date(rule).getTime()

    return this
  }

  /**
   * @description
   * filterDatesBetween filters a result set base on a date
   * this methods filters base on a range of two properties.
   * Filtering resultSet between two date properties One and Two
   * I.e startDate - endDate where rule one and Two are the rules
   * to filter on each properties.
   * We do this by first filtering by one value and the filter
   * by the next
   * @param {String} propertyOne this is the property of the object
   * @param {String} propertyTwo this is the property of the object
   * to filter on
   * @param {String} ruleOne the value to evaluate on greater
   * @param {String} ruleTwo the value to evaluate on lesser
   *
   * @return {Object} returns the object instance
   */
  filterDatesBetween (propertyOne, propertyTwo, ruleOne, ruleTwo) {
    this.filterDateGreaterOrEqual(propertyOne, ruleOne)
      .applyFilter()
      .filterDateLesserOrEqual(propertyTwo, ruleTwo)
  }

  /**
   * @description
   * filterExact filters a result set base an exact match
   * this is a valid match if the rule matches the value
   * @param {String} property this is the property of the object
   * to filter on
   * @param {Number} rule the value to evaluate on
   *
   * @return {Object} returns the object instance
   */
  filterExact (property, rule) {
    this.filters[property] = value => value === rule

    return this
  }

  /**
   * @description
   * applyFilter uses lodash `conforms` method to
   * evaluate multiple filters on a dataset
   * @return {Object} returns the object instance
   */
  applyFilter () {
    this.results = this._
      .filter(this.results, this._.conforms(this.filters))

    // we want to reset the filters
    this.filters = {}
    return this
  }
}

export default Base
