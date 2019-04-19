<template>
  <figure class="avatar">
    <img class="avatar-img" :src="`http://i.pravatar.cc/80?img=${id}`">
  </figure>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    id: {
      type: Number,
      default: 1
    }
  }

}
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  overflow: hidden;
  border-radius: 20px;
  height: 32px;
  width: 32px;

  &.-md {
    height: 40px;
    width: 40px;
  }
}

.avatar-img {
  height: 100%;
}
</style>
