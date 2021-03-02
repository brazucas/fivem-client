<script lang="ts">

  import type { BrowserChat } from "../../interfaces/brazucas";
  import { servidor } from "../../services/common";
  import { writable } from "svelte/store";

  declare let $: any;

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

  const mensagens = writable<BrowserChat.Mensagem[]>([
    {
      autor: $servidor.jogadores[0],
      data: new Date(),
      eu: true,
      mensagem: 'Oi!',
    },
    {
      autor: $servidor.jogadores[1],
      data: new Date(),
      eu: false,
      mensagem: 'Oi!',
    },
    {
      autor: $servidor.jogadores[0],
      data: new Date(),
      eu: true,
      mensagem: 'Tudo bem?',
    },
    {
      autor: $servidor.jogadores[1],
      data: new Date(),
      eu: false,
      mensagem: 'Tudo!',
    }
  ]);

  let form = {
    mensagem: '',
  }

  const enviar = async (e) => {
    if (e.charCode === 13) {
      mensagens.update((mensagens) => {
        mensagens.push({
          autor: $servidor.jogadores[0],
          data: new Date(),
          eu: true,
          mensagem: form.mensagem,
        });
        form.mensagem = '';
        return mensagens;
      });
    }
  }
</script>

<style lang="scss">
  .mytext {
    border: 0;
    padding: 10px;
    background: whitesmoke;
  }

  .text {
    width: 75%;
    display: flex;
    flex-direction: column;
  }

  .text > p:first-of-type {
    width: 100%;
    margin-top: 0;
    margin-bottom: auto;
    line-height: 13px;
    font-size: 12px;
  }

  .text > p:last-of-type {
    width: 100%;
    text-align: right;
    color: silver;
    margin-bottom: -7px;
    margin-top: auto;
  }

  .text-l {
    float: left;
    padding-right: 10px;
  }

  .text-r {
    float: right;
    padding-left: 10px;
  }

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    float: left;
    padding-right: 10px;
  }

  .macro {
    margin-top: 5px;
    width: 100%;
    border-radius: 5px;
    padding: 5px;
    display: flex;
  }

  .msj-rta {
    float: right;
    background: whitesmoke;
  }

  .msj {
    float: left;
    background: white;
  }

  .frame {
    background: #e0e0de;
    height: 100%;
    overflow: hidden;
    padding: 0;
  }

  .frame > div:last-of-type {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
  }

  body > div > div > div:nth-child(2) > span {
    background: whitesmoke;
    padding: 10px;
    font-size: 21px;
    border-radius: 50%;
  }

  body > div > div > div.msj-rta.macro {
    margin: auto;
    margin-left: 1%;
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 18px;
    position: absolute;
    bottom: 47px;
    display: flex;
    flex-direction: column;
    top: 0;
    overflow-y: scroll;
  }

  .msj:before {
    width: 0;
    height: 0;
    content: "";
    top: -5px;
    left: -14px;
    position: relative;
    border-style: solid;
    border-width: 0 13px 13px 0;
    border-color: transparent #ffffff transparent transparent;
  }

  .msj-rta:after {
    width: 0;
    height: 0;
    content: "";
    top: -5px;
    left: 14px;
    position: relative;
    border-style: solid;
    border-width: 13px 13px 0 0;
    border-color: whitesmoke transparent transparent transparent;
  }

  input:focus {
    outline: none;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #d4d4d4;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #d4d4d4;
  }

  :-ms-input-placeholder { /* IE 10+ */
    color: #d4d4d4;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #d4d4d4;
  }
</style>

<div class="col-sm-3 col-sm-offset-4 frame" id="chat">
    <ul>
        {#each $mensagens as mensagem}
            <li style="width:100%;">
                <div class:msj-rta={!mensagem.eu} class:msj={mensagem.eu} class="macro">
                    {#if mensagem.eu}
                        <div class="avatar" style="padding:0px 0px 0px 10px !important">
                            <img class="img-circle rounded-full"
                                 style="width:100%;"
                                 src="https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg"/>
                            <!--{mensagem.autor.nome}-->
                        </div>
                    {/if}
                    <div class:text-l={mensagem.eu} class:text-r={!mensagem.eu} class="text">
                        <p>{ mensagem.mensagem }</p>
                        <p><small>{ mensagem.data }</small></p>
                    </div>
                    {#if !mensagem.eu}
                        <div class="avatar" style="padding:0px 0px 0px 10px !important">
                            <img class="img-circle rounded-full"
                                 style="width:100%;"
                                 src="https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48"/>
                            <!--{mensagem.autor.nome}-->
                        </div>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
    <div>
        <div class="msj-rta macro">
            <div class="text text-r" style="background:whitesmoke !important">
                <input class="mytext" bind:value={form.mensagem} placeholder="Escreva uma mensagem"
                       on:keypress={enviar}/>
            </div>

        </div>
    </div>
</div>
