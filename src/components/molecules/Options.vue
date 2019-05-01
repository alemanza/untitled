<template>
  <div class="options">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Options',
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

.option-percent, .option-percent {
  display: none;
}

.options {
  &.-inline {

    .option-label {
      padding: 16px 16px 16px 48px;

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

        &.-voted {
          background-color: #FFF;
          color: #252526;
          font-weight: bold;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: solid 2px #E9794D;
            border-radius: 4px;
          }
        }
      }
    }

    .drag {
      display: none;
    }

  }
  &.-multiline {
    .drag, .remove-option {
      position: absolute;
      display: block;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      line-height: 1;
      width: 48px;
      box-sizing: border-box;
      text-align: center;
      color: #CACACA;
      padding: 16px 14px 16px 16px;
    }

    .remove-option {
      right: 0;
      left: auto;
      color: #878787;
      font-size: 12px;
      padding: 20px 20px 20px 16px;
    }
  }

  .option-label {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #FFF;
    color: #252526;
    padding: 16px 48px;
    display: block;
    border-radius: 4px;
    font-size: 16px;
    line-height: 20px;
    box-shadow: 0 2px 14px 0px rgba(#000,.04);

    &.-voted {
      .option-percent {
        display: block;
      }
      .option-percent {
        display: block;
        opacity: 1;
      }

      &:before, &:after {
        content: none;
      }

      .option-label-value {
        transform: translateX(20px);
      }
    }
  }

  .option-label-value {
    transition: transform .2s ease-out;
    display: inline-block;
  }

  .option-percent {
    color: #E9794D;
    transition: opacity .6s ease-out;
    opacity: 0;
    position: absolute;
    right: calc(100% - 54px);
  }

  .option-percent-bar {
    position: absolute;
    transition: transform ease-out .3s;
    background-color: #E9794D;
    height: 6px;
    border-radius: 0 4px 0 0;
    width: 100%;
    bottom: 0;
    left:0;
    transform: translateX(-100%);
  }
}

</style>
