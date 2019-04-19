<template>
  <div class="user">
    <Avatar :id="1"/>
    <span class="name">Marina Espósito</span>
    <Button class="button">Seguir</Button>
  </div>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'

export default {
  name: 'User',
  components: {
    Avatar,
    Button,
  }
}

</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.name {
  font-size: 14px;
  color: #CACACA;
  margin-left: 12px;
}

.button {
  margin-left: 12px;
}

</style>

