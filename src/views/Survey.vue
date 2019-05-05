<template>
  <section class="survey">

    <!-- <div v-if="">
      sarasa
    </div>
    <div v-else>
      serese
    </div> -->
    <HeaderComponent>

      <!-- Survey User -->
      <User :data="owner"/>

      <!-- Survey Stats -->
      <Stats
        :date="survey.createDate"
        :votes="surveyVotes"
        @timeOver="handleTimeOver"
        :voted="initVote"
      />

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
            :disabled="voted"
          >

          <span class="option-label" :class="{'-voted' : voted}">
            <span class="option-percent">
              <number
                :to="stats[key]"
                :duration=".5"
                :format="percentageFormat"
              />
            </span>
            <span class="option-label-value">{{opt.value}}</span>
            <span class="option-percent-bar" :style="{ transform: `translateX(${stats[key]-100}%)` }"></span>
          </span>
        </label>
      </div>

    </Options>

    <div v-show="selected && !voted" ref="surveyButton" class="submit-container">
      <div @click.prevent="submitVote" class="submit">
        <i class="submit-icon ion-md-send"></i>
        <span class="submit-label">Enviar</span>
      </div>
    </div>

    <div v-if="voted" class="share-container">
      <Share/>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader"></div>
    <div v-if="timeOver" class="time-over"></div>
  </section>
</template>

<script>
import HeaderComponent from '@/components/atoms/HeaderComponent'
import User from '@/components/molecules/User'
import Stats from '@/components/molecules/Stats'
import Statement from '@/components/molecules/Statement'
import Options from '@/components/molecules/Options'
import Share from '@/components/molecules/Share'
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
    Share,
  },
  data() {
    return {
      survey: {
        id: null,
        statement: '',
        selection: null,
        createDate: null,
      },
      owner: {},
      selected: false,
      voted: false,
      surveyVotes: [],
      stats: [],
      initVote: false,
      loading: false,
      timeOver: false,
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
      const votesRef = DB.collection('votes').where('surveyID', '==', this.survey.id)
        .onSnapshot(res => {
          this.surveyVotes = []
          res.forEach(item => {
            this.surveyVotes = [...this.surveyVotes, item.data().optionSelected]
          });
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

      const yOffset = window.pageYOffset
      const innerHt = window.innerHeight
      const offsetHt = document.documentElement.offsetHeight
      // bottomOfWindow
      if ( yOffset + innerHt !== offsetHt || !this.voted ) {
        setTimeout(() => {
          this.scrollToBottom()
        },200)
      }
    },

    submitVote() {
      this.loading = true
      this.initVote = true
      const vote = {
        userID: this.userID,
        surveyID: this.survey.id,
        optionSelected: this.survey.selection,
      }

      const voteRef = DB.collection('votes')
      voteRef.add(vote)
        .then(() => {
          this.getResults()
        })
    },

    getResults() {
      const values = Object.values(this.surveyVotes)
      const result = values.reduce((counter, value) => {
        counter[value] = (counter[value] || 0) + 1
        return counter
      },[0])

      const votesLength = Object.keys(this.surveyVotes).length;

      this.stats = result.map(item => {
        return parseFloat(((item/votesLength)*100).toFixed(1))
      })

      console.log('percentages: ', this.stats)

      // this.stats = percentages
      this.voted = true
      this.loading = false

    },
    handleTimeOver() {
      this.timeOver = true
    },
    percentageFormat(value) {
      return `${parseFloat(value.toFixed(1))}%`
    },
  }
}
</script>

<style lang="scss" scoped>
.survey {
  position: relative;
}

.loader, .time-over {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(#E9794D, .9);

  &:before {
    content: 'Loading...';
    position: absolute;
    font-size: 20px;
    color: #FFF;
  }
}

.time-over {
  &:before {
    content: 'Se terminó el tiempo';
  }
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

.share-container {
  padding: 4px 24px 0;
  margin-bottom: 40px;
}

</style>


