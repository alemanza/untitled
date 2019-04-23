<template>
  <div>
    <div class="step-data">
      <div class="textarea-container">
        <textarea
          v-model="survey.statement"
          class="textarea"
          :maxlength="maxlength"
          rows="1"
          placeholder="Escribí acá el enunciado…"
          @input="fitToContent"
        >
        </textarea>
        <span class="textarea-border"></span>
      </div>
      <p class="step-rules">Tenés 90 caracteres para utilizar en el enunciado.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewStepOne',
  data() {
    return {
      survey: {
        statement: null,
      },
      maxlength: 90
    }
  },
  methods: {
    fitToContent(e) {
      const textArea = e.target
      const lineHeight = 32

      textArea.style.height = 'auto';
      const scHeight = textArea.scrollHeight;
      const rows = Math.ceil(scHeight / lineHeight)
      textArea.style.height = (lineHeight * rows)+'px';
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea-container {
  margin-bottom: 12px;
}

.textarea {
  appearance: none;
  margin: 0 0 8px 0;
  border: none;
  background-color: transparent;
  resize: none;
  font-size: 24px;
  line-height: 32px;
  color: #FEFEFE;
  width: 100%;
  outline: none;
  height: auto;
	min-height: 32px;
	box-sizing: border-box;
  display: block;

  &::-webkit-resizer {
    display: none;
  }

  &::placeholder {
    color: #878787;
  }
}

.textarea-border {
  border-bottom: solid 1px #444;
  display: block;
}

.step-rules {
  font-size: 12px;
  line-height: 14px;
  color: #CACACA;
}
</style>
