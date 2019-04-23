<template>
  <div>
    <div class="step-data">
      <Options class="step-options -multiline">
        <li v-for="(opt, key) in survey.options" :key="key" class="step-option">
          <label class="option-label">
            <i class="drag icon ion-ios-settings"></i>
            <textarea
              v-model="opt.value"
              class="textarea"
              :maxlength="maxlength"
              rows="1"
              :placeholder="`Escribí la respuesta ${key + 1}`"
              @input="fitToContent"
            ></textarea>
            <i class="remove-option icon ion-ios-settings" @click="removeItem(key)"></i>
          </label>
            <p class="step-rules">Tenés 41 caracteres para utilizar en la respuesta.</p>
        </li>
      </Options>

      <div class="button-container">
        <div @click="addItem">
          <ButtonGhost @click="addItem">+ Agregar una respuesta</ButtonGhost>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Options from '@/components/molecules/Options'
import ButtonGhost from '@/components/atoms/ButtonGhost'

export default {
  name: 'NewStepTwo',
  components: {
    Options,
    ButtonGhost,
  },
  data() {
    return {
      survey: {
        options: [
          { value: null },
          { value: null }
        ]
      },
      maxlength: 50,
    }
  },
  methods: {
    addItem() {
      this.survey.options.push({value: null})
    },
    removeItem(el) {
      if (this.survey.options.length > 2) {
        this.$delete(this.survey.options, el)
      }
    },
    fitToContent(e) {
      const textArea = e.target
      const lineHeight = 20
      textArea.style.height = 'auto';
      const scHeight = textArea.scrollHeight;
      const rows = Math.ceil((scHeight) / lineHeight)
      textArea.style.height = (lineHeight * rows)+'px';
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  padding: 0 24px 52px;
}

.textarea {
  appearance: none;
  border: none;
  background-color: #FFF;
  resize: none;
  font-size: 16px;
  line-height: 20px;
  color: #252526;
  width: 100%;
  outline: none;
  display: block;
  height: auto;
	min-height: 20px;
	box-sizing: border-box;

  &::-webkit-resizer {
    display: none;
  }

  &::placeholder {
    color: #878787;
  }

}

.step-rules {
  font-size: 12px;
  color: #444;
}

.step-option {
  & + & {
    margin-top: 16px;
  }
}

.option-label {
  margin-bottom: 8px;
}
</style>
