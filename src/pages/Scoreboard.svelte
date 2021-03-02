<script lang="ts">
  import Window from '../components/Window.svelte';
  import { servidor } from "../services/common";

  // @TODO mock
  servidor.update((state) => {
    state.jogadores.push({
      id: 1,
      nome: 'Mandrakke_Army',
      nivel: 10,
      ping: 80,
    });
    state.jogadores.push({
      id: 2,
      nome: 'German',
      nivel: 14,
      ping: 92,
    });
    state.jogadores.push({
      id: 3,
      nome: 'Premium',
      nivel: 8,
      ping: 67,
    });
    state.jogadores.push({
      id: 4,
      nome: 'BFR_Joaoloco',
      nivel: 16,
      ping: 102,
    });
    return state;
  })
</script>

<style lang="scss">
  .subtitulo {
    text-align: center;
    background-color: #222;
    border-radius: 3px;
    color: #FFFFFF;
    margin: 8px;
    font-size: 12px;
    padding: 20px;
  }

  .lista {
    padding: 10px;
    color: #FFFFFF;

    .cabecalho {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .total-jogadores {
        margin-bottom: 20px;
      }
    }

    .container-jogadores {
      width: 100%;

      .cabecalho-lista {
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #222;
        border-radius: 3px;

        div {
          text-align: center;

          &.nome {
            text-align: left;
          }
        }
      }

      .nome {
        width: 250px;
      }

      .id, .nivel, .ping {
        width: 50px;
      }

      .lista-jogadores {
        height: 400px;
        overflow-y: auto;
        width: 100%;

        .jogador {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;

          div {
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow-x: hidden;

            &.nome {
              text-align: left;
            }
          }

          &:hover {
            cursor: pointer;
            background-color: #666;
          }
        }
      }
    }
  }

</style>

<Window canClose={false}>
    <div class="lista">
        <div class="cabecalho">
            <div class="nome-servidor">

            </div>
            <div class="total-jogadores">
                Jogadores online: { $servidor.jogadoresOnline }
            </div>
        </div>

        <div class="container-jogadores">
            <div class="cabecalho-lista">
                <div class="id">ID</div>
                <div class="nome">Nome</div>
                <div class="nivel">Nível</div>
                <div class="ping">Ping</div>
            </div>

            <div class="lista-jogadores">
                <div>
                    {#each $servidor.jogadores as player}
                        <div class="jogador">
                            <div class="id">
                                { player.id }
                            </div>

                            <div class="nome">
                                { player.nome }
                            </div>

                            <div class="nivel">
                                { player.nivel }
                            </div>

                            <div class="ping">
                                { player.ping }
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</Window>
