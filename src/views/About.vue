<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{displayName}}</p>
    <p>{{email}}</p>
    <img :src="photoURL" style="width: 100%; max-width: 200px; margin: 40px auto; display: block;"/>
  </div>
</template>

<script>
import { DB } from '../helpers/firebaseConf'

export default {
  name: 'About',
  data() {
    return {
      displayName: null,
      email: null,
      photoURL: null
    }
  },
  mounted() {
    DB.collection('users').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const userData = doc.data()
          this.displayName = userData.displayName
          this.email = userData.email
          this.photoURL = userData.photoURL
        });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }
}



</script>