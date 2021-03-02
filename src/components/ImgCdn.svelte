<script lang="ts">
  import { onMount } from "svelte";

  export const cdnUrl = "https://cdn.brz.gg/";
  export let fileName;
  export let width;
  export let folder = 'gtav';

  let imagem: HTMLImageElement;
  let carregado = false;

  onMount(() => {
    imagem.onload = () => {
      console.log('>>>> teste');
      carregado = true;
    }

    const observer = new MutationObserver((changes) => {
      changes.forEach(change => {
        if (change.attributeName.includes('src')) {
          carregado = false;
          console.dir(imagem.src);
        }
      });
    });

    observer.observe(imagem, {attributes: true});
  })
</script>

<style lang="scss">
  .carregando {
    opacity: .5;
  }
</style>

<img class:carregando={!carregado} bind:this={imagem} src="{cdnUrl + folder + '/' + fileName}" alt="" width={width}/>
