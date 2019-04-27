<template>
  <div class="user">
    <Avatar class="-md" :url="data.photoURL"/>
    <div class="description">
      <span class="name">{{data.displayName}}</span>
      <span class="surveys">25 encuestas</span>
    </div>
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
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}

</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.description {
  margin-left: 12px;
}

.name {
  color: #FFF;
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.surveys {
  color: #CACACA;
  display: block;
  font-size: 12px;
}

.button {
  margin-left: 16px;
}

</style>

