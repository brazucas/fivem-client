<script lang="ts">
  export let min = 0;
  export let max = 100;
  export let value = 0;
  export let invertido = false;
  export let activeColor = '#FF0000';
  export let backgroundColor = '#FF3333';
  let barWidth: number;
  const containerWidth = 150;

  barWidth = Math.min((containerWidth * value) / max, containerWidth);

  if (invertido) {
    barWidth = containerWidth - barWidth;
  }
</script>

<style lang="scss">
  .indicator-container {
    height: 15px;
  }

  .indicator-bar {
    margin-left: -1px;
    height: 15px;
  }
</style>

<div class="indicator-container" style="
        width: { containerWidth } + 'px';
        background-color: { invertido ? activeColor : backgroundColor };
        border-radius: { invertido ? '15px 0 0 15px' : '0 15px 15px 0'}">
    <div class="indicator-bar" style="
        width: { barWidth } + 'px';
        background-color: { invertido ? backgroundColor : activeColor };
        border-radius: { invertido ? '15px 0 0 15px' : '0 15px 15px 0'}"></div>
</div>
