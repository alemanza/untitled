<template>
  <div>
    <NewStepOne v-show="currentStep === 1" @nextStep="handleNextStep"/>
    <NewStepTwo v-show="currentStep === 2" @nextStep="handleNextStep"/>
    <NewStepThree v-show="currentStep === 3" @nextStep="handleNextStep"/>
    <NewStepFour v-show="currentStep === 4" @nextStep="handleNextStep"/>
  </div>
</template>

<script>
import NewStepOne from '@/components/organisms/NewStepOne'
import NewStepTwo from '@/components/organisms/NewStepTwo'
import NewStepThree from '@/components/organisms/NewStepThree'
import NewStepFour from '@/components/organisms/NewStepFour'


export default {
  name: 'New',
  components: {
    NewStepOne,
    NewStepTwo,
    NewStepThree,
    NewStepFour,
  },
  data() {
    return {
      currentStep: 4,
      survey: {}
    }
  },
  methods: {
    handleNextStep(data) {
      this.currentStep = this.currentStep + 1
      this.survey = { ...this.survey, ...data }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

