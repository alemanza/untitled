<template>
  <div class="tags-container">
    <div class="step-description">
      <h3 class="tags-title">Coloca las etiquetas relacionadas</h3>
    </div>
    <div class="step-data">
      <div class="tags-input-container">
        <div class="textarea-container">
          <textarea
            v-model="tag"
            @keyup.enter="addItem"
            @change="addItem"
            cols="30"
            placeholder="Escribí un tag..."
            class="textarea"
            rows="1"
          >
          </textarea>
          <span class="textarea-border"></span>
        </div>
        <p class="step-rules">Separa las etiquetas con un ENTER o una coma.</p>
      </div>

      <ul class="tags">
        <li v-for="(tag, key) in survey.tags" :key="key" class="tag">
          <span class="tag-label" @click="removeItem(key)">{{tag.value}}</span>
          <span class="tag-icon icon ion-ios-settings"></span>
        </li>
      </ul>
      <div class="submit-container">
        <button @click="$emit('submit', survey)">Crear Encuesta</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewStepThree',
  data() {
    return {
      tag: '',
      survey: {
        tags: []
      },
    }
  },
  methods: {
    addItem() {
      const tagsCleansValues = this.tag.replace(/\s/g, '')
      const tagValue = tagsCleansValues.trim().split(',')
      tagValue.forEach(tag => {
        if (tag) {
          this.survey.tags.push({value: tag})
        }
      });
      this.tag = ''
    },
    removeItem(el) {
      this.$delete(this.survey.tags, el)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-container {
padding: 0 24px 24px;
}

.tags-title {
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 24px;
}

.tags-input-container {
  margin-bottom: 40px;
}

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
  color: #252526;
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
    color: #D1C4A8;
  }
}

.textarea-border {
  border-bottom: solid 1px #D1C4A8;
  display: block;
}

.step-rules {
  font-size: 12px;
  line-height: 14px;
}

.tags {
  display: flex;
  margin: 0 -4px 56px;
  flex-wrap: wrap;
}

.tag {
  height: 28px;
  align-items: center;
  background-color: #F0EFEB;
  display: flex;
  margin: 0 4px 4px;
  padding: 0 8px 0 12px;
  border-radius: 4px;
  color: #252526;
  font-size: 14px;
}

.tag-icon {
  font-size: 12px;
  margin-left: 12px;
  color: #878787;
}

.submit-container {
  display: flex;
  justify-content: flex-end
}

</style>
