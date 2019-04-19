<template>
  <div>
    <h3>Login</h3>
    <br>
    <div id="auth-container"></div>
  </div>
</template>

<script>
import Firebase from 'firebase/app'
import * as FireUi from 'firebaseui'

import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'Auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/about',
      signInOptions: [
        // Providers
        Firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        Firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: () => {
        window.location.assign('/tos')
      },
      // Privacy policy url/callback.
      privacyPolicyUrl: () => {
        window.location.assign('/privacy-policy')
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new FireUi.auth.AuthUI(Firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#auth-container', uiConfig);
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
