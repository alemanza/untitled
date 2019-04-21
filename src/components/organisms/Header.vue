<template>
  <header>
    <Logo />
    <nav class="actions">
      <div class="actions-items">
        <span class="item"><strong>+</strong> Crear encuesta</span>
      </div>
      <Avatar :url="user.photoURL"/>
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/atoms/Logo'
import Avatar from '@/components/atoms/Avatar'

export default {
  name: 'Header',
  components: {
    Logo,
    Avatar
  },
  computed: {
    user() {
      const user = this.$store.getters.currentUser
      return user ? user : {}
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #252526;
  border-bottom: solid 1px #303030;
  padding: 12px 24px;
}

.item {
  color: #E9DEC7;
  display: inline-block;
}

.actions {
  display: flex;
  align-items: center;
}

.actions-items {
  line-height: 20px;
  margin-right: 20px;
  padding-right: 20px;
  border-right: solid 1px #444;
}

strong {
  font-size: 18px;
}
</style>
