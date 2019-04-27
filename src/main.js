import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

import { Auth, DB } from './helpers/firebaseConf'

Vue.config.productionTip = false

let app = null

Auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {

    const { email, displayName, emailVerified, photoURL, uid } = user

    const currentUser = {
      email,
      displayName,
      emailVerified,
      photoURL,
      uid
    }

    DB.collection('users').doc(currentUser.uid).get()
      .then(user => {
        if (user.exists) {
          store.dispatch('loginUser', {...currentUser, ...user.data()})
          console.log('usuarix ya registradx')
        } else {
          DB.collection('users').doc(currentUser.uid).set({
            email,
            displayName,
            photoURL
          }).then(() => {
            store.dispatch('loginUser', currentUser)
            .then(() => {
              console.log('nuevx usuarix')
            })
            .catch(err => {
              console.error(err)
            })
          })
        }
      })
  }
})
