<template>
  <div>
    <div class="step-counter">
      <span class="counter-data">
        (<span>3</span>
        de
        <span>4</span>)
      </span>
      <span class="counter-bar"> [ ----------- ]</span>
    </div>
    <hr>
    <br>
    <div class="step-description">
      <p>Por último, agrega etiquetas relacionadas a la temática</p>
    </div>
    <div class="step-data">
      <textarea v-model="tag" @keyup.enter="addItem" @change="addItem" cols="30" placeholder="Escribí un tag..."></textarea>
      <p class="step-rules">Separa las etiquetas con un ENTER o una coma.</p>

      <hr>
      <br>

      <ul>
        <li v-for="(tag, key) in survey.tags" :key="key">
          <span class="tag" @click="removeItem(key)">{{tag.value}}</span>
        </li>
        <hr>
        <br>
      </ul>
      <br>
      <br>
      <br>
      <button @click="$emit('nextStep', survey)">Siguiente</button>
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
