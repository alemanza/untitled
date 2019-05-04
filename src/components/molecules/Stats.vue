<template>
  <div class="stats">
    <span class="countdown" :class="{ '-show' : showCount}">
      <span class="item">
        <span class="number">{{hours}}</span>
      </span>
      <span class="item">
        <span class="number">{{minutes}}</span>
      </span>
      <span class="item">
        <span class="number">{{seconds}}</span>
      </span>
    </span>
    <div class="voters">
      <i class="voters-icon icon ion-md-person"></i>
      <span class="voters-counter">{{votes.length}}</span>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'

export default {
  name: 'Stats',
  props: {
    date: {
      type: Object,
      default: () => {}
    },
    votes: {
      type: Array,
      default: () => []
    },
    voted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCount: false,
      hours: '- -',
      minutes: '- -',
      seconds: '- -',
      inter: null,
    }
  },
  watch: {
    date(newVal) {
      this.counter(newVal)
      this.showCount = true
    },
    voted() {
      clearInterval(this.inter)
    }
  },
  methods: {
    counter() {
      // let timeLimit = Moment(new Date(this.date.seconds * 1000)).add(1, 'd')
      let timeLimit = Moment().add(1, 'm')

      this.inter = setInterval(() => {
        const end = Moment().add(1, 's').isSameOrAfter(timeLimit)

        if (end) {
          this.$emit('timeOver')
          clearInterval(this.inter);
        }

        let now = Moment()
        let diff = Moment.duration(timeLimit.diff(now))

        this.hours = (diff.hours() < 10) ? "0" + diff.hours() : diff.hours()
        this.minutes = (diff.minutes() < 10) ? "0" + diff.minutes() : diff.minutes()
        this.seconds = (diff.seconds() < 10) ? "0" + diff.seconds() : diff.seconds()

      }, 1000);
    },
  }
}
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.countdown {
  margin-right: 16px;

  &.-show {
    .item .number{
      opacity: 1;
    }
  }
}

.item {
  display: inline-block;
  font-size: 12px;
  padding: 8px;
  min-width: 31px;
  text-align: center;
  box-sizing: border-box;
  color: #FFF;
  background-color: #444;
  border-radius: 4px;

  & + & {
    position: relative;
    margin-left: 12px;

    &:after {
      content: ':';
      color: #CACACA;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      text-align: center;
      position: absolute;
    }
  }
}

.number {
  transition: opacity 1s ease-out;
  opacity: 0;
}

.voters {
  display: flex;
  align-items: center;
  height: 20px;
  color: #FFF;
  padding: 0 12px;
  border-left: solid 1px #444;
}

.voters-icon {
  font-size: 16px;
  color: #B6B6B6;
  width: 16px;
  text-align: center;
  margin: 0 4px;
}

.voters-counter {
  font-size: 14px;
  line-height: 14px;
}
</style>
