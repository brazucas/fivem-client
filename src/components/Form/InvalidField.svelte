<script lang="ts">
    export let message: string;
</script>

<style lang="scss">
    .error {
      width: fit-content;
      background-color: #222;
      border-radius: 3px;
      color: orange;
      margin-top: 8px;
      font-size: 12px;
      padding: 10px;
    }
</style>

<div class="error">
    { message }
</div>
