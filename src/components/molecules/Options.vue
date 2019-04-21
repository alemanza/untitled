<template>
  <ul class="options">
    <li v-for="(opt, key) in options"
      :key="key"
      class="option"
    >
      <label class="option-container">
        <input class="option-input"
          v-model="optionsId"
          type="radio"
          :value="key"
          @change="$emit('handleSelect')"
        >
        <span class="option-label">
          {{opt}}
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Options',
  props: {
    options: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      optionsId: this.id
    }
  }
}
</script>

<style lang="scss" scoped>
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

</style>
