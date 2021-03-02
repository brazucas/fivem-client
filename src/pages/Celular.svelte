<script lang="ts">
  import { onMount } from "svelte";
  import Window from "../components/Window.svelte";

  declare let bioMp: any;

  onMount(async () => {
    setTimeout(() => {
      bioMp(document.getElementById('preview'), {
        url: 'http://localhost:5000/#/celular/chat',
        view: 'front',
        image: 'biomp/images/iphone6_front_black.png',
        scale: 0.5,
      });
    }, 1000)
  });
</script>

<Window position="bottom-right" layout={false} canClose={false} showHeader={false}>
    <div id="preview"></div>
</Window>
