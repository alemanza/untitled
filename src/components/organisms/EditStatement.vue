<template>
  <div>
    <div class="step-data">
      <div class="textarea-container">
        <Textarea
          v-model="survey.statement"
          :maxlength="maxlength"
          rows="1"
          placeholder="Escribí acá el enunciado…"
          @input="$emit('handleStatement', survey.statement)"
        />
      </div>
      <p class="step-rules">Tenés 90 caracteres para utilizar en el enunciado.</p>
    </div>
  </div>
</template>

<script>
import Textarea from '@/components/atoms/Textarea'

export default {
  name: 'EditStatement',
  components: {
    Textarea
  },
  data() {
    return {
      survey: {
        statement: null,
      },
      maxlength: 90
    }
  },
}
</script>

<style lang="scss" scoped>
.textarea-container {
  margin-bottom: 12px;
}

.step-rules {
  font-size: 12px;
  line-height: 14px;
  color: #CACACA;
}
</style>
