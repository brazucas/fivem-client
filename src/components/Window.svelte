<script lang="ts">
  export let showHeader = true;
  export let minHeight = false;

  export let canClose = true;
  export let position = 'center';
  export let layout = true;
  export let top = false;
  export let anim = true;

  function fechar() {
    console.log('Fechando janela.');
  }
</script>

<style lang="scss">
  @import '../app';

  .container {
    width: 50%;
    margin: 0 auto;
    background-color: #383a3e;
    box-shadow: 0 9px 20px rgba(0, 0, 0, 0.3);
  }

  .float {
    width: 100%;
    @include center(true, true);

    &.superior-direito {
      right: 0;
      top: 100px;
      width: auto;
      left: auto;
    }

    &.superior-esquerdo {
      left: 100px;
      top: 100px;
      width: auto;
    }

    &.centro-esquerdo {
      width: 550px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%) !important;
    }

    &.centro-superior {
      width: auto;
      transform: matrix;
      top: 50px;
    }

    &.centro-direito {
      right: 100px;
      width: auto;
      left: auto;
    }

    &.inferior-esquerdo {
      left: 100px;
      bottom: 100px;
      width: auto;
      transform: initial;
      top: auto;
    }

    &.inferior-direito {
      right: 100px;
      bottom: 100px;
      width: auto;
      transform: initial;
      top: auto;
      left: auto;
    }
  }

  .container {
    width: 50%;
    margin: 0 auto;
    background-color: #383a3e;
    box-shadow: 0 9px 20px rgba(0, 0, 0, 0.3);
  }

  .header {
    border-bottom: 1px solid #86888f;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<div class="float text-white"
     class:centro={position === 'center'}
     class:superior-direito={position === 'top-right'}
     class:superior-esquerdo={position === 'top-left'}
     class:centro-superior={position === 'top-center'}
     class:centro-inferior={position === 'bottom-center'}
     class:centro-esquerdo={position === 'middle-left'}
     class:centro-direito={position === 'middle-right'}
     class:inferior-esquerdo={position === 'bottom-left'}
     class:inferior-direito={position === 'bottom-right'}
     style="top: {top}px">
    <div class:container={layout} class="go-up delay-1" style={ minHeight ? `min-height: 80px` : '' }>
        {#if showHeader}
            <div class="header border-b-2 border-white border-solid">
                <img src="build/images/logo.png" alt="" width="120px" class="pt-3 pb-3"/>
            </div>

            {#if canClose}
                <div on:click={fechar}>Fechar</div>
            {/if}
        {/if}

        <slot></slot>
    </div>
</div>
