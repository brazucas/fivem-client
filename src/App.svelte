<script lang="ts">
  import routes from './routes';
  import Router from 'svelte-spa-router';

  let display = false;

  window.addEventListener("message", function (event) {
    const item: any = event.data;

    if (item.event) {
      switch (item.event) {
        case "acessar":
          window.location.href = '#/' + item.pagina
          break;
        case "ui":
          display = item.status;
          break
      }
    }
  });
</script>

<style type="text/scss">
  .body {
    /*background-color: red;*/
    background-color: transparent !important;
    background-size: cover !important;
  }
</style>

<main class="padding: 0; margin: 0;" style="display: {display ? 'block' : 'none'}">
    <div class="body absolute w-screen h-screen">
        <Router {routes}/>
    </div>
</main>
