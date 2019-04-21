<template>
  <section class="survey">
    <div class="header">

      <!-- Survey User -->
      <User/>

      <!-- Survey Stats -->
      <Stats />

      <!-- Survey Statement -->
      <Statement :text="survey.statement"/>

    </div>

    <!-- Survey Options -->
    <Options
      :options="survey.options"
      :id="survey.id"
      @handleSelect="handleSelect"
    />

    <!-- <ul class="options">
      <li v-for="(opt, key) in survey.options"
        :key="key"
        class="option"
      >
        <label class="option-container">
          <input class="option-input"
            v-model="survey.id"
            type="radio"
            :value="key"
            @change="handleSelect"
          >
          <span class="option-label">
            {{opt}}
          </span>
        </label>
      </li>
    </ul> -->

    <div v-show="selected" ref="surveyButton" class="submit-container">
      <div class="submit">
        <i class="submit-icon ion-ios-settings"></i>
        <span class="submit-label">Enviar</span>
      </div>
    </div>
  </section>
</template>

<script>
import User from '@/components/molecules/User'
import Stats from '@/components/molecules/Stats'
import Statement from '@/components/molecules/Statement'
import Options from '@/components/molecules/Options'

import VueScrollTo from 'vue-scrollto'

export default {
  name: 'Survey',
  components: {
    User,
    Stats,
    Statement,
    Options,
  },
  data() {
    return {
      survey: {
        id: 123,
        limitTime: '12-32-44',
        statement: '¿Quién creés que va a ganar las elecciones este año en la Ciudad Autónoma de Buenos Aires?',
        selected: null,
        options: [
          'Cambiemos',
          'Unión Ciudadana',
          'Frente Renovador',
          'Frente de Izquierda y de los Trabajadores',
          'Otro partido'
        ],
      },
      selected: false
    }
  },
  methods: {
    scrollToBottom() {
      const target = this.$refs.surveyButton
      const targetHeight = target.offsetHeight
      const windowHeight = window.innerHeight
      const targetOffset = targetHeight - windowHeight
      const options = {
        offset: targetOffset,
        easing: 'ease-out'
      }

      VueScrollTo.scrollTo(this.$refs.surveyButton, 200, options)
    },
    handleSelect() {
      if (!this.selected) this.selected = true

      // bottomOfWindow
      if (window.pageYOffset + window.innerHeight !== document.documentElement.offsetHeight) {
        setTimeout(() => {
          this.scrollToBottom()
        },200)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #252526;
  padding: 24px 24px 54px;
}

.submit-container {
  padding: 0 24px 24px;
  box-sizing: border-box;
}

.submit {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  background-color: #131415;
}

.submit-icon {
  font-size: 20px;
}

.submit-label {
  font-size: 16px;
  margin-left: 12px;
}

</style>


