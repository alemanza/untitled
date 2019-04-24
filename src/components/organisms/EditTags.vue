<template>
  <div class="tags-container">
    <div class="step-description">
      <h3 class="tags-title">Coloca las etiquetas relacionadas</h3>
    </div>
    <div class="step-data">
      <div class="tags-input-container">
        <div class="textarea-container">
          <Textarea
            v-model="tag"
            placeholder="Escribí un tag..."
            class="-light"
            :rows="1"
            @handleApply="addItem"
            no-resize
          />
        </div>
        <p class="step-rules">Separa las etiquetas con un ENTER o una coma.</p>
      </div>

      <ul class="tags">
        <li v-for="(tag, key) in survey.tags" :key="key" class="tag" @click="removeItem(key)">
          <span class="tag-label">{{tag.value}}</span>
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
import Textarea from '@/components/atoms/Textarea'

export default {
  name: 'EditTags',
  components: {
    Textarea
  },
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
      this.$emit('handleTags', this.survey.tags)
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
