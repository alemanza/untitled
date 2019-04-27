<template>
  <section class="survey">
    <HeaderComponent>

      <!-- Survey User -->
      <User :data="owner"/>

      <!-- Survey Stats -->
      <Stats />

      <!-- Survey Statement -->
      <Statement :text="survey.statement"/>

    </HeaderComponent>

    <!-- Survey Options -->
    <Options class="-inline">
      <div v-for="(opt, key) in survey.options"
        :key="key"
        class="option"
      >
        <label>
          <input class="option-input"
            v-model="survey.id"
            type="radio"
            :value="key"
            @change="handleSelect"
          >
          <span class="option-label">
            {{opt.value}}
          </span>
        </label>
      </div>

    </Options>

    <div v-show="selected" ref="surveyButton" class="submit-container">
      <div class="submit">
        <i class="submit-icon ion-ios-settings"></i>
        <span class="submit-label">Enviar</span>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderComponent from '@/components/atoms/HeaderComponent'
import User from '@/components/molecules/User'
import Stats from '@/components/molecules/Stats'
import Statement from '@/components/molecules/Statement'
import Options from '@/components/molecules/Options'

import VueScrollTo from 'vue-scrollto'

import { DB } from '../helpers/firebaseConf'

export default {
  name: 'Survey',
  components: {
    HeaderComponent,
    User,
    Stats,
    Statement,
    Options,
  },
  data() {
    return {
      survey: {
        statement: ''
      },
      owner: {},
      selected: false
    }
  },
  mounted() {
    // const TEST_ID ='iRaqYqFdC3jLqT7b1ufM'
    const surveyId = this.$route.params.id


    const surveyRef = DB.collection('surveys').doc(surveyId)


    surveyRef.get()
      .then(res => {
        this.survey = res.data()

        const ownersRef = DB.collection('users').doc(res.data().ownerId)
        ownersRef.get()
          .then(res => {
            this.owner = res.data()
          })
          .catch(err => {
              console.log("Error getting documents: ", err);
          });


      })
      .catch(err => {
          console.log("Error getting documents: ", err);
      });
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


