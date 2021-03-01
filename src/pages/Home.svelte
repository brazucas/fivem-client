<script>
  import Window from "../components/Window.svelte";
</script>

<Window showHeader={false} minHeight={true}>
    <div class="p-5">
        <div class="text-center text-lg">
            GUI do servidor
        </div>

        <div class="text-center italic text-sm">
            Abaixo as janelas prontas para uso no servidor.
        </div>

        <a href="#/login">
            <button>
                Login
            </button>
        </a>

        <a href="#/gui">
            <button>
                GUI
            </button>
        </a>
    </div>
</Window>
