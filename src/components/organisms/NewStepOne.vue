<template>
  <div>
    <div class="step-counter">
      <span class="counter-data">
        (<span>1</span>
        de
        <span>4</span>)
      </span>
      <span class="counter-bar"> [ ----- ]</span>
    </div>
    <div class="step-description">
      <p>Primero lo primero, ¿cuál será el enunciado de la encuesta?</p>
    </div>
    <div class="step-data">
      <textarea v-model="survey.statement" :maxlength="maxlength" name="" id="" cols="30" placeholder="Escribí acá el enunciado…"></textarea>
      <p class="step-rules">Te quedan 2 caracteres para utilizar en el enunciado.</p>
      <br>
      <br>
      <br>
      <button @click="$emit('nextStep', survey)">Siguiente</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewStepOne',
  data() {
    return {
      survey: {
        statement: null,
      },
      maxlength: 90
    }
  }
}
</script>
