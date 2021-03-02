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

        <h3>Player não autenticado</h3>
        <a href="#/login">
            <button>
                Login
            </button>
        </a>

        <a href="#/registro">
            <button>
                Registro
            </button>
        </a>

        <a href="#/recuperar-acesso">
            <button>
                Recuperar acesso
            </button>
        </a>

        <h3>Player autenticado - Ferramentas</h3>
        <a href="#/scoreboard">
            <button>
                Informações do servidor (Scoreboard)
            </button>
        </a>

        <a href="#/celular">
            <button>
                Celular
            </button>
        </a>

        <h3>Outros</h3>
        <a href="#/hud">
            <button>
                HUD
            </button>
        </a>
    </div>
</Window>
