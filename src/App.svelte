<script lang="ts">
  import routes from './routes';
  import Router from 'svelte-spa-router';
</script>

<style type="text/scss">
  .body {
    /*background-color: red;*/
    background: url(images/web-bg.jpg) no-repeat;
    background-size: cover;
  }
</style>

<main class="padding: 0; margin: 0;">
    <div class="body absolute w-screen h-screen">
        <Router {routes}/>
    </div>
</main>
