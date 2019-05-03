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
      userSvs: []
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

      // DB Refs
      const svsRef = DB.collection('surveys')
      const cuRef = DB.collection('users').doc(ownerId)

      svsRef.add({
        ownerId,
        statement,
        options,
        tags,
        status: 'open',
        createDate: new Date
      })
      .then(svDB => {
        return DB.runTransaction(transaction => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(cuRef).then(cuRes => {
              if (cuRes.exists && cuRes.data().surveyIDs) {
                this.userSvs = cuRes.data().surveyIDs
              }
              this.userSvs.push(svDB.id)
              transaction.update(cuRef, 'surveyIDs', this.userSvs)

          });
        }).then(() => {
            console.log("Transaction successfully committed!");
        }).catch(error => {
            console.log("Transaction failed: ", error);
        });
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

