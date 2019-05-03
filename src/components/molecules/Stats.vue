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
    }
  },
  data() {
    return {
      showCount: false,
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  },
  watch: {
    date(newVal) {
      this.updateDate(newVal)
      this.showCount = true
    }
  },
  methods: {
    updateDate(date) {
      const createdDate = new Date(date.seconds * 1000)
      const countDownDate = new Date(createdDate.setDate(createdDate.getDate() + 1))
      countDownDate.setDate(countDownDate.getDate() + 3)

      // Update the count down every 1 second
      const x = setInterval(() => {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
        }
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
