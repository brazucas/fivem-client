<script lang="ts">
  import routes from './routes';
  import Router from 'svelte-spa-router';
  import { jogador } from "./services/common";

  let display = false;

  window.addEventListener("message", function (event) {
    const item: any = event.data;

    console.log('>>> possui item.user_id? ', item.user_id);
    if (item.user_id) {
      jogador.update((u) => {
        u.id = item.user_id;
        return u;
      });
    }

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
