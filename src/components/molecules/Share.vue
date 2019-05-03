<template>
  <div class="share">
    <div class="buttons">
      <Button class="button -secondary">Compartir</Button>
      <Button class="button -ghost">Copiar enlace</Button>
    </div>
    <p class="text">Te enviaremos los resultados por email cuando estén listos.</p>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button'

export default {
  name: 'Shared',
  components: {
    Button,
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  margin-bottom: 16px;
}

.text {
  font-size: 16px;
  line-height: 20px;
}

.button {
  flex: 1;

  &:last-child {
    margin-left: 16px;
  }
}
</style>

