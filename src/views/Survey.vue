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
            v-model="survey.selection"
            type="radio"
            :value="key"
            @change="handleSelect(key)"
          >

          <span class="option-label" :class="{'-voted' : voted}">
            <span class="option-percent">{{stats[key]}}%</span>
            {{opt.value}}
            <span class="option-percent-bar"></span>
          </span>
        </label>
      </div>

    </Options>

    <div v-show="selected" ref="surveyButton" class="submit-container">
      <div @click="submitVote" class="submit">
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
        id: null,
        statement: '',
        selection: null,
      },
      owner: {},
      selected: false,
      voted: false,
      surveyVotes: [],
      stats: []
    }
  },
  created() {
    // Get svID
    this.survey.id = this.$route.params.id

    // DB Refs
    const svRef = DB.collection('surveys').doc(this.survey.id)
    svRef.onSnapshot(res => {
      this.survey = {...this.survey, ...res.data()}
      const ownerRef = DB.collection('users').doc(res.data().ownerId)
      ownerRef.onSnapshot(res => {
        this.owner = res.data()
      })
    })
  },
  computed: {
    // Get User in session
    userID() {
      return this.$store.getters.currentUser.uid
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
    },

    submitVote() {
      const votesRef = DB.collection('votes')
      const voteRef = votesRef.where('surveyID', '==', this.survey.id)

      const vote = {
        userID: this.userID,
        surveyID: this.survey.id,
        optionSelected: this.survey.selection,
      }

      votesRef.add(vote)
        .then(res => {
          voteRef.get()
            .then(res => {
              if (!res.empty) {
                res.docs.forEach(item => {
                  this.surveyVotes.push(item.data().optionSelected)
                })
                this.voted = true
                this.getResults()
              }
            })
        })
    },

    getResults() {
      const values = Object.values(this.surveyVotes)
      const result = values.reduce((counter, value) => {
        counter[value] = (counter[value] || 0) + 1
        return counter
      },[0])

      const votesLength = Object.keys(this.surveyVotes).length;
      this.stats = result.map(item => Math.round((item/votesLength)*100))
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


