const functions = require('firebase-functions')
const admin     = require('firebase-admin')
const animals   = require('./utils/animals')
const utils     = require('./utils/utils')


admin.initializeApp(functions.config().firebase)


exports.registerUser = functions.auth.user().onCreate(function(event) {

  let userCount;
  let uid = event.data.uid;

  const userCountRef = admin.database().ref("stats/userCount")
  const userRef = admin.database().ref(`users/${uid}`)


  // Incrementing the userCount
  userCountRef.transaction(currentUserCount => {
    console.info('currentUserCount is :', currentUserCount)
    userCount = (currentUserCount || 0) + 1;

    return userCount

  }).then(() => {

    userRef.transaction(newUser => {
      if (newUser !== null) return newUser

      const newAnimal = utils.getAnimal(userCount - 1)

      console.info(`${newAnimal.value} New user ${newAnimal.name} created`)
      return {
        uid: uid,
        name: newAnimal.name,
        emoji: newAnimal.value,
        count: 0,
      }
    })
  })
})
