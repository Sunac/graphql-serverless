import { database } from '../utils/firebase'

import Category from './Category'

export const category = new Category(database)
