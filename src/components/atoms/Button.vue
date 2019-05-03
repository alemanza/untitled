<template>
  <a class="button">
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'Button',
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 28px;
  box-sizing: border-box;
  font-size: 14px;
  color: #EADFC8;
  border: solid 1px #EADFC8;
  border-radius: 4px;

  &.-secondary {
    color: #EADFC8;
    background-color: #252526;
  }

  &.-ghost {
    color: #252526;
    border: solid 1px #252526;
  }
}
</style>
