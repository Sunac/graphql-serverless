import * as admin from 'firebase-admin'

import { firebaseServiceAccount } from '../config'

let app = {}
// re-initializing an app that has already been initialized
// throws an error. Since we only use on app, we want to check
// if we already initialized the app. if this is true, we just assign
// the initialized app to the app variable.
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: process.env.FIRESTORE_URL
  })
} else {
  app = admin.apps[0]
}

// initialize database
export const database = app.firestore()

export default app
