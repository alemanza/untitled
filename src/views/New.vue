<template>
  <div>
    <HeaderComponent>
      <h2 class="title">Nueva encuesta</h2>
      <EditStatement @handleStatement="statementChange"/>
    </HeaderComponent>
    <EditOptions @handleOptions="optionsChange"/>
    <EditTags @handleTags="tagsChange"/>

    <div class="submit-container">
      <button @click="submitSurvey">Crear Encuesta</button>
    </div>

  </div>
</template>

<script>
import HeaderComponent from '@/components/atoms/HeaderComponent'
import EditStatement from '@/components/organisms/EditStatement'
import EditOptions from '@/components/organisms/EditOptions'
import EditTags from '@/components/organisms/EditTags'

import { DB } from '../helpers/firebaseConf'

export default {
  name: 'New',
  components: {
    HeaderComponent,
    EditStatement,
    EditOptions,
    EditTags,
  },
  data() {
    return {
      survey: {},
      userSurveys: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    statementChange(data) {
      this.survey.statement = data
    },
    optionsChange(data) {
      this.survey.options = data
    },
    tagsChange(data) {
      this.survey.tags = data
    },
    submitSurvey() {
      const ownerId = this.currentUser.uid
      const { statement, options, tags } = this.survey

      DB.collection('surveys').add({
        ownerId,
        startDate: new Date(),
        status: 'open',
        statement,
        options,
        tags
      }).then(surv => {
        if (this.currentUser.surveyIDs) {
          this.userSurveys = [...this.currentUser.surveyIDs, surv.id]
        } else {
          this.userSurveys = [surv.id]
        }
        DB.collection('users').doc(this.currentUser.uid).update('surveyIDs', this.userSurveys)
          .then(res => {
            console.log('encuesta creada!')
          })
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #FFF;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  letter-spacing: -.2px;
}
</style>

