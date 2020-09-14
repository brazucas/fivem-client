<script>
  export let showHeader = true;
  export let minHeight = false;
</script>

<style lang="scss">
  @import '../app';

  .container {
    width: 50%;
    margin: 0 auto;
    background-color: #383a3e;
    box-shadow: 0 9px 20px rgba(0, 0, 0, 0.3);
  }
</style>

<div class="float text-white">
    <div class="container go-up delay-1" style={ minHeight ? `min-height: 80px` : '' }>
        {#if showHeader}
            <div class="header border-b-2 border-white border-solid">
                <img src="build/images/logo.png" alt="" width="120px" class="pt-3 pb-3"/>
            </div>
        {/if}

        <slot></slot>
    </div>
</div>
