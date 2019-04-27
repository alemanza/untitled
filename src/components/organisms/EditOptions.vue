<template>
  <div>
    <div class="step-data">
      <Options class="step-options -multiline">

        <Draggable
          v-model="survey.options"
          handle=".drag"
          v-bind="dragOptions"
          @input="handleOption"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <Option v-for="(opt, key) in survey.options" :key="key" class="step-option">
              <label class="option-label">
                <i class="drag icon ion-ios-settings"></i>
                <Textarea
                  v-model="opt.value"
                  inline
                  :maxlength="maxlength"
                  rows="1"
                  :placeholder="`Escribí la respuesta ${key + 1}`"
                  @input="handleOption"
                />
                <i class="remove-option icon ion-ios-settings" @click="removeItem(key)"></i>
              </label>
                <p class="step-rules">Tenés 41 caracteres para utilizar en la respuesta.</p>
            </Option>
          </transition-group>
        </Draggable>

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
import Textarea from '@/components/atoms/Textarea'

import ButtonGhost from '@/components/atoms/ButtonGhost'
import Option from '@/components/molecules/Option'
import Options from '@/components/molecules/Options'

import Draggable from 'vuedraggable'

export default {
  name: 'EditOptions',
  components: {
    Textarea,
    ButtonGhost,
    Option,
    Options,
    Draggable,
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
      drag: false,
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    handleOption() {
      this.$emit('handleOptions', this.survey.options)
    },
    addItem() {
      this.survey.options.push({value: null})
    },
    removeItem(el) {
      if (this.survey.options.length > 2) {
        this.$delete(this.survey.options, el)
      }
    },
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
