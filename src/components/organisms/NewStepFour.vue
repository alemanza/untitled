<template>
  <div>
    <div class="step-counter">
      <span class="counter-data">
        (<span>4</span>
        de
        <span>4</span>)
      </span>
      <span class="counter-bar"> [ ------------------- ]</span>
    </div>
    <hr>
    <br>
    <div class="step-description">
      <p>Así se va lucir tu nueva encuesta:</p>
    </div>


    <!-- <div class="step-data">
      <ul>
        <li v-for="(opt, key) in survey.options" :key="key">
          <hr>
          <br>
          <textarea v-model="opt.value" :maxlength="maxlength" cols="30" :placeholder="`Escribí la respuesta ${key + 1}`"></textarea>
          <button @click="removeItem(key)">[ X ]</button>
          <p class="step-rules">Te quedan 2 caracteres para utilizar en el enunciado.</p>
        </li>
      </ul>
      <br>
      <br>
      <br>
      <button @click="addItem">+ Agregar una respuesta</button>
      <button @click="$emit('nextStep', survey)">Siguiente</button>
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'NewStepFour',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
