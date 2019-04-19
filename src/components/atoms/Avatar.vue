<template>
  <figure class="avatar">
    <img class="avatar-img" :src="`http://i.pravatar.cc/64?img=${id}`">
  </figure>
</template>

<script>
export default {
  name: 'Avatar',
  props: [
    'id'
  ]
}
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  height: 32px;
  width: 32px;
  overflow: hidden;
  border-radius: 20px;
}

.avatar-img {
  height: 100%;
}
</style>
