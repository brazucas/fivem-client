<script lang="ts">
  import Window from "../components/Window.svelte";
  import Indicator from "../components/HUD/Indicator.svelte";
  import { jogador, playerHudMenuAtivo, voiceChatListeners } from "../services/common";
  import { CountUp } from "countup.js";
  import { onMount } from "svelte";
  import ImgCdn from "../components/ImgCdn.svelte";

  let diffForcaFisica: number;
  let diffSono: number;
  let diffFome: number;
  let diffSede: number;
  let submenu = {
    self: false,
    moderacao: false,
    administracao: false,
    ajuda: false,
  };

  let menuAtivo = false;

  playerHudMenuAtivo.subscribe((ativo) => menuAtivo = ativo);

  function hideMenus() {
    Object.keys(submenu).forEach(key => {
      submenu[key] = false;
    });
  }

  function toggleSubMenu(nome: string, force?: boolean) {
    hideMenus();

    if (typeof force !== 'undefined') {
      submenu[nome] = force;
    } else {
      submenu[nome] = !submenu[nome];
    }
  }

  onMount(async () => {
    const dinheiroCountUp = new CountUp('dinheiro', 0, {
      decimal: '',
      useGrouping: false,
    });

    const creditosCountUp = new CountUp('creditos', 0, {
      decimal: '',
      useGrouping: false,
    });

    if (!dinheiroCountUp.error) {
      dinheiroCountUp.start();
    } else {
      console.error(dinheiroCountUp.error);
    }

    if (!creditosCountUp.error) {
      creditosCountUp.start();
    } else {
      console.error(creditosCountUp.error);
    }

    diffForcaFisica = 1;
    diffFome = 2;
    diffSono = 1;
    diffSede = 1;

    console.log($jogador);
  })

  function browserPage(pagina: string) {
    hideMenus();
    mp.trigger('BrowserPagina', 'central', pagina);
  }
</script>

<style lang="scss">
  :host {
    --ion-background-color: transparent;
  }

  .hud-item {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .hud-item-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .fome-text, .sede-text, .sono-text, .forca-fisica-text {
      margin: 0 10px;
      font-size: 16px;
      font-weight: bold;
    }

    .fome-text {
      color: #ffbf00;
    }

    .sede-text {
      color: #00ffe5;
    }

    .sono-text {
      color: #e95bff;
    }

    .forca-fisica-text {
      color: #32d302;
    }

    &.headset {
      margin-left: 50px;

      .hud-item-container {
        align-items: flex-end;
      }

      .hud-icon {
        width: 50px;

        padding: 5px 9px;
        border: 7px solid #8c601e;
        border-radius: 56px;
      }

      .hud-indicator {
        background-color: #8c601e;
        border: 1px solid #8c601e;
        border-radius: 15px;
        color: #FFFFFF;
        max-width: 55px;
        text-align: center;
        padding: 1px;
        transform: translateX(-8px);
        font-size: 15px;
      }
    }

    .hud-icon {
      width: 50px;

      &.fome {
        padding: 5px;
        border: 7px solid #ffbf00;
        border-radius: 50px;
      }

      &.sede {
        padding: 5px;
        border: 7px solid #00ffe5;
        border-radius: 50px;
      }

      &.sono {
        padding: 5px;
        border: 7px solid #e95bff;
        border-radius: 50px;
      }

      &.forca {
        padding: 5px;
        border: 7px solid #32d302;
        border-radius: 50px;
      }
    }

    .hud-indicator {
      margin-bottom: 5px;
      width: 150px;
      color: orange;
      font-weight: bold;
      font-size: 22px;

      &.barra-normal {
        transform: translateX(-6px);
      }

      &.barra-invertida {
        transform: translateX(6px);
      }
    }

    .dinheiro {
      margin: 40px auto 0 auto;
      font-size: 22px;
      font-weight: bold;
      color: green;
    }

    .creditos {
      margin: 15px auto 0 auto;
      font-size: 22px;
      font-weight: bold;
      color: orange;
    }
  }

  .menu {
    opacity: 0.3;

    &.ativo {
      opacity: 1;
    }

    .menu-container {
      display: flex;
      align-items: center;
      background-color: #383a3e;
      border-radius: 20px;
      padding: 0 10px;

      .menu-item {
        cursor: pointer;
        padding: 0 15px;
        margin: 5px 0;
        border-right: 1px solid #FFFFFF;
        position: relative;

        &:last-child {
          border-right: none;
        }

        .menu-label {
          color: #FFFFFF;
          text-align: center;
        }

        .menu-submenu {
          border-top: 1px solid #666;
          position: absolute;
          top: 24px;
          left: 0;
          background-color: #383a3e;
          border-radius: 0 0 15px 15px;

          .menu-item {
            border-right: none;
            padding: 10px 15px;
            cursor: pointer;

            &:hover {
              background-color: #86888f;
            }
          }
        }
      }
    }
  }
</style>

<Window position="top-right" top="230" anim={false} showHeader={false} layout={false}>
    <div class="hud-item go-up delay-1">
        <div class="hud-item-container">
            <div style="width: 50px;">
                <div class="go-up fome-text delay-4">
                    {#if diffFome > 0}+{/if}
                    { diffFome }
                </div>
            </div>

            <div class="hud-icon fome">
                <ImgCdn fileName="player-gui/meat.png"/>
            </div>

            <div>
                <div class="hud-indicator barra-normal">
                    <Indicator value={$jogador.fome} activeColor="#ffbf00" backgroundColor="#9e7600">
                    </Indicator>
                </div>

                <div class="hud-indicator barra-invertida">
                    <Indicator invertido={true} value={$jogador.sede}
                               activeColor="#00ffe5" backgroundColor="#009e8e">
                    </Indicator>
                </div>
            </div>

            <div class="hud-icon sede">
                <ImgCdn fileName="player-gui/drink.png"/>
            </div>

            <div style="width: 50px;">
                <div class="go-up sede-text delay-4">
                    {#if diffSede > 0}+{/if}
                    { diffSede }
                </div>
            </div>
        </div>
    </div>

    <div class="hud-item go-up delay-3">
        <div class="hud-item-container">
            <div style="width: 50px;">
                <div class="go-up sono-text delay-4">
                    {#if diffSono > 0}+{/if}
                    { diffSono }
                </div>
            </div>

            <div class="hud-icon sono">
                <ImgCdn fileName="player-gui/bed.png"/>
            </div>

            <div>
                <div class="hud-indicator barra-normal">
                    <Indicator value={$jogador.sono} activeColor="#e95bff"
                               backgroundColor="#682972">

                    </Indicator>
                </div>

                <div class="hud-indicator barra-invertida">
                    <Indicator invertido={true} value={$jogador.forcaFisica}
                               activeColor="#32d302" backgroundColor="#1a7000">

                    </Indicator>
                </div>
            </div>

            <div class="hud-icon forca">
                <ImgCdn fileName="player-gui/strength.png"/>
            </div>

            <div style="width: 50px;">
                <div class="go-up forca-fisica-text delay-4">
                    {#if diffForcaFisica > 0}+{/if}
                    { diffForcaFisica }
                </div>
            </div>
        </div>
    </div>

    <div class="hud-item go-up delay-4 headset">
        <div class="hud-item-container">
            <div class="hud-icon">
                <ImgCdn fileName="player-gui/headset.png"/>
            </div>

            <div class="hud-indicator">
                { $voiceChatListeners.length }
            </div>
        </div>
    </div>

    <div class="hud-item go-up delay-6">
        <div class="dinheiro">
            R$ <span id="dinheiro">{ $jogador.dinheiro }</span>
        </div>
    </div>

    <div class="hud-item go-up delay-7">
        <div class="creditos">
            C$ <span id="creditos">{ $jogador.creditos }</span>
        </div>
    </div>
</Window>

<Window position="bottom-right" anim={false} showHeader={false} layout={false}>
    <div class="go-up delay-1">
        <ImgCdn fileName="logotipo_full_web.png" width="120px"/>
    </div>
</Window>

<Window position="top-center" anim={false} showHeader={false} layout={false}>
    <small>Pressione "F3" para acessar o menu.</small>

    <div class="{menuAtivo ? 'ativo menu' : 'menu'}">
        <div class="go-down delay-1">
            <div class="menu-container" on:mouseleave={() => toggleSubMenu('self', false)}>
                <div class="menu-item" on:mouseenter={() => toggleSubMenu('self', true)}>
                    <div class="menu-label">
                        { $jogador.nome }
                    </div>

                    {#if submenu['self']}
                        <div class="menu-submenu">
                            <div class="menu-item go-down delay-1">
                                <div class="menu-label">
                                    Meus Dados
                                </div>
                            </div>
                            <div class="menu-item go-down delay-2">
                                <div class="menu-label">
                                    Profissão
                                </div>
                            </div>
                            <div class="menu-item go-down delay-3">
                                <div class="menu-label">
                                    Meus Veículos
                                </div>
                            </div>
                            <div class="menu-item go-down delay-4">
                                <div class="menu-label">
                                    Minhas Casas
                                </div>
                            </div>
                            <div class="menu-item go-down delay-5">
                                <div class="menu-label">
                                    Minhas Propriedades
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="menu-item">
                    <div class="menu-label" on:mouseenter={() => toggleSubMenu('moderacao', true)}>
                        Moderação
                    </div>

                    {#if submenu['moderacao']}
                        <div class="menu-submenu">
                            <div class="menu-item go-down delay-1">
                                <div class="menu-label">
                                    Checar Jogador
                                </div>
                            </div>
                            <div class="menu-item go-down delay-2">
                                <div class="menu-label">
                                    Chutar
                                </div>
                            </div>
                            <div class="menu-item go-down delay-3">
                                <div class="menu-label">
                                    Banir
                                </div>
                            </div>
                            <div class="menu-item go-down delay-4">
                                <div class="menu-label">
                                    Teleportar
                                </div>
                            </div>
                            <div class="menu-item go-down delay-5">
                                <div class="menu-label">
                                    Calar
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="menu-item">
                    <div class="menu-label" on:mouseenter={() => toggleSubMenu('administracao', true)}>
                        Administração
                    </div>

                    {#if submenu['administracao']}
                        <div class="menu-submenu">
                            <div class="menu-item go-down delay-1">
                                <div class="menu-label">
                                    Editor de Mapa
                                </div>
                            </div>
                            <div class="menu-item go-down delay-2">
                                <div class="menu-label" on:click={() => browserPage('gerenciar-veiculo')}>
                                    Gerenciar Veículos
                                </div>
                            </div>
                            <div class="menu-item go-down delay-3">
                                <div class="menu-label">
                                    Gerenciar Casas
                                </div>
                            </div>
                            <div class="menu-item go-down delay-4">
                                <div class="menu-label">
                                    Gerenciar Propriedades
                                </div>
                            </div>
                            <div class="menu-item go-down delay-5">
                                <div class="menu-label">
                                    Gerenciar Jogador
                                </div>
                            </div>
                            <div class="menu-item go-down delay-6">
                                <div class="menu-label">
                                    Lista de Banidos
                                </div>
                            </div>
                            <div class="menu-item go-down delay-6">
                                <div class="menu-label" on:click={() => browserPage('visualizar-animacoes')}>
                                    Lista de animações
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="menu-item">
                    <div class="menu-label">
                        Comprar Créditos
                    </div>
                </div>

                <div class="menu-item">
                    <div class="menu-label" style="width: 80px" on:mouseenter={() => toggleSubMenu('ajuda', true)}>
                        Ajuda
                    </div>

                    {#if submenu['ajuda']}
                        <div class="menu-submenu">
                            <div class="menu-item go-down delay-1">
                                <div class="menu-label">
                                    Profissões
                                </div>
                            </div>
                            <div class="menu-item go-down delay-2">
                                <div class="menu-label">
                                    Bicos
                                </div>
                            </div>
                            <div class="menu-item go-down delay-3">
                                <div class="menu-label">
                                    Locais
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</Window>
