<template>
  <a class="button-ghost">
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'ButtonGhost',
}
</script>

<style lang="scss" scoped>
.button-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 52px;
  box-sizing: border-box;
  font-size: 16px;
  color: #444;
  border: solid 1px #444;
  border-radius: 4px;
}
</style>
