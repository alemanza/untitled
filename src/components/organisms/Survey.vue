<template>
  <section class="survey">
    <div class="header">

      <!-- Survey User -->
      <User/>

      <!-- Survey Stats -->
      <Stats />

      <div class="statement">
        <h3>{{survey.statement}}</h3>
      </div>
    </div>

    <ul class="options">
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
    </ul>

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

import VueScrollTo from 'vue-scrollto'

export default {
  name: 'Survey',
  components: {
    User,
    Stats,
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

.statement {
  font-size: 24px;
  color: #FEFEFE;
  line-height: 32px;
}

.options {
  padding: 0 24px 24px;
  margin-top: -26px;
}

.option {
  & + & {
    margin-top: 8px;
  }
}

.option-label {
  position: relative;
  background-color: #FFF;
  padding: 16px 16px 16px 48px;
  display: block;
  border-radius: 4px;
  font-size: 16px;
  line-height: 20px;
  box-shadow: 0 2px 14px 0px rgba(#000,.04);

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 16px;
    height: 20px;
    width: 20px;
    transform: translateY(-50%);
    box-sizing: border-box;
  }

  &:before {
    content: '';
    appearance: none;
    border: solid 1px #C2C2C2;
    height: 20px;
    flex: 0 0 20px;
    border-radius: 20px;
    margin: 0 12px 0 0;
    outline: none;
  }

  &:after {
    content: "\f4a7";
    transition: opacity .3s;
    color: #FFF;
    opacity: 0;
    text-align: center;
    line-height: 20px;
    display: inline-block;
    font-family: "Ionicons";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.option-input {
  position: absolute;
  appearance: none;
  padding: 0;
  margin: 0;
  opacity: 0;

  &:checked + .option-label {
    background-color: #E9794D;
    color: #FFF;

    &:before {
      background-color: #FB9F7B;
      border-color: #FB9F7B;
    }

    &:after {
      opacity: 1;
    }
  }
}

.submit-container {
  padding: 0 24px 24px;
  box-sizing: border-box;
  // height: 1200px;
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


