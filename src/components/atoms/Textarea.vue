<template>
  <div>
    <textarea
      :class="{'-inline' : inline}"
      class="textarea"
      v-bind="$attrs"
      @input="input"
      @keyup.enter="$emit('handleApply')"
      @keyup.188="$emit('handleApply')"
    >
    </textarea>
    <span v-if="!inline" class="textarea-border"></span>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    noResize: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  methods: {
    fitToContent(event) {
      const textArea = event.target
      const lineHeight = this.inline ? 20 : 32
      textArea.style.height = 'auto';
      const scHeight = textArea.scrollHeight;
      const rows = Math.ceil(scHeight / lineHeight)
      textArea.style.height = (lineHeight * rows)+'px';
    },
    input(event) {
      this.$emit('input', event.target.value)
      if (!this.noResize) this.fitToContent(event)
    }
  }
}

</script>

<style lang="scss" scoped>
.textarea {
  appearance: none;
  margin: 0 0 8px;
  border: none;
  background-color: transparent;
  resize: none;
  font-size: 24px;
  line-height: 32px;
  color: #FEFEFE;
  width: 100%;
  outline: none;
  height: auto;
	min-height: 32px;
	box-sizing: border-box;
  display: block;

  &::-webkit-resizer {
    display: none;
  }
  &::placeholder {
    color: #878787;
  }

  &.-inline {
    background-color: #FFF;
    font-size: 16px;
    margin: 0;
    line-height: 20px;
    min-height: 20px;
    color: #252526;
  }
}

.textarea-border {
  border-bottom: solid 1px #444;
  display: block;
}

// THEMES
// light
.-light {
  .textarea {
    color: #252526;

    &::placeholder {
      color: #D1C4A8;
    }
  }

  .textarea-border {
    border-bottom: solid 1px #D1C4A8;
  }
}

</style>
