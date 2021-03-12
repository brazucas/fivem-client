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

        <h3>Início</h3>
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

        <h3>Jogador</h3>
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

        <h3>Administração</h3>
        <a href="#/admin/criar-veiculo">
            <button>
                Criar veículos
            </button>
        </a>

        <a href="#/admin/banir-jogador">
            <button>
                Banir jogador
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
