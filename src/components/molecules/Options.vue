<template>
  <ul class="options">
    <li v-for="(opt, key) in survey.options"
      :key="key"
      class="option"
    >
      <label class="option-container">
        <input class="option-input"
          v-model="survey.id"
          type="radio"
          :value="key"
          @change="handleSelect"
        >
        <span class="option-label">
          {{opt}}
        </span>
      </label>
    </li>
  </ul>
</template>