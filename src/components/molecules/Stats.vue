<template>
  <div class="stats">
    <span class="countdown">
      <span class="item">12</span>
      <span class="item">38</span>
      <span class="item">09</span>
    </span>
    <div class="voters">
      <i class="voters-icon icon ion-ios-settings"></i>
      <span class="voters-counter">15.876</span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.stats {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.countdown {
  margin-right: 16px;
}

.item {
  display: inline-block;
  font-size: 12px;
  padding: 8px;
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
