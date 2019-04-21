<template>
  <div class="statement">
    <h3>{{text}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Statement',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
.statement {
  font-size: 24px;
  color: #FEFEFE;
  line-height: 32px;
}
</style>
