<template>
  <div>
    <NewStepOne v-show="currentStep === 1" @nextStep="handleNextStep"/>
    <NewStepTwo v-show="currentStep === 2" @nextStep="handleNextStep"/>
    <NewStepThree v-show="currentStep === 3" @submit="submit"/>
  </div>
</template>

<script>
import NewStepOne from '@/components/organisms/NewStepOne'
import NewStepTwo from '@/components/organisms/NewStepTwo'
import NewStepThree from '@/components/organisms/NewStepThree'

import { DB } from '../helpers/firebaseConf'


export default {
  name: 'New',
  components: {
    NewStepOne,
    NewStepTwo,
    NewStepThree,
  },
  data() {
    return {
      currentStep: 1,
      survey: {}
    }
  },
  computed: {
    ownerId() {
      return this.$store.getters.currentUser.uid
    }
  },
  methods: {
    handleNextStep(data) {
      this.currentStep = this.currentStep + 1
      this.survey = { ...this.survey, ...data }
    },
    submit(data) {
      this.survey = { ...this.survey, ...data }
      const ownerId = this.ownerId
      const { statement, options, tags } = this.survey

      DB.collection('surveys').add({
        ownerId,
        startDate: new Date(),
        status: 'open',
        statement,
        options,
        tags
      }).then(() => {
        console.log('encuesta adentro!')
      }).catch(err => {
        console.error(err)
      })

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

