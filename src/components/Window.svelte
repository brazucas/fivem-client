<script>

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

<div class="float">
    <div class="container go-up delay-1">
        <div class="border-b-2 border-white border-solid">
            Brazuca's Server
        </div>

        <slot></slot>
    </div>
</div>
