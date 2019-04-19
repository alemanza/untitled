<template>
  <div>
    <button v-if="showLogout" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import Firebase from 'firebase/app'

export default {
  name: 'Logout',
  computed: {
    showLogout() {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    handleLogout() {
      Firebase.auth().signOut()
        .then(() => {
          console.log('Usuario deslogueado')
          this.$store.dispatch('logoutUser')
            .then(() => {
              this.$router.replace('login')
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 8px 16px;
  background-color: rgb(255, 94, 94);
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 3px;
  outline: none;
}
</style>
