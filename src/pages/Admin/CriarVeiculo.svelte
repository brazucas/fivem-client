<script lang="ts">
  import Window from '../..//components/Window.svelte';
  import { mostrarErro, toast } from '../../services/common';
  import { object, string } from "yup";
  import { EnumToArray, extractErrors } from "../../helpers";
  import ImgCdn from "../../components/ImgCdn.svelte";
  import { Veiculos } from "../../util/vehicles";
  import { criarVeiculo } from "../../services/browser/VeiculoService";
  import type { DadosVeiculo } from "../../interfaces/brazucas";
  import InvalidField from "../../components/Form/InvalidField.svelte";
  import { fecharNui } from "../../services/browser/BrowserBridgeService";

  let pesquisa = '';

  const listaVeiculos = EnumToArray(Veiculos).sort();

  const formValidation = object().shape({
    corPrimaria: string().required('A cor primária é obrigatória'),
    corSecundaria: string().required('A cor secundária é obrigatória'),
    modelo: string().required('O modelo é obrigatório'),
    proprietario: string().required('O proprietário é obrigatório'),
    placa: string().required('A placa é obrigatória'),
    valorOriginal: string().required('O valor original é obrigatório'),
    valorVenda: string(),
    trancado: string(),
    aVenda: string(),
    motorLigado: string(),
    transparencia: string().required('A transparência é obrigatória'),
    tamanho: string().required('O tamanho é obrigatório'),
  });

  let form: DadosVeiculo = {
    modelo: 'adder',
    corPrimaria: '',
    corSecundaria: '',
    placa: '',
    proprietario: '',
    trancado: true,
    motor: false,
    transparencia: 100,
    tamanho: '',
    valorOriginal: 0,
    valorVenda: 0,
    aVenda: true,
  };

  let errors = {};

  const enviar = async () => {
    try {
      await formValidation.validate(form, {abortEarly: false});
      errors = {}

      try {
        await criarVeiculo({
          modelo: form.modelo,
          corPrimaria: form.corPrimaria,
          corSecundaria: form.corSecundaria,
          placa: form.placa,
          proprietario: form.proprietario,
          trancado: form.trancado,
          motor: form.motor,
          transparencia: form.transparencia,
          tamanho: form.tamanho,
          valorOriginal: form.valorOriginal,
          valorVenda: form.valorVenda,
          aVenda: form.aVenda,
        });

        fecharNui()
      } catch (e) {
        await mostrarErro(e);
      }
    } catch (e) {
      errors = extractErrors(e);
      console.error(errors);
    }
  }
</script>

<style lang="scss">
  @import '../../app';

  select {
    width: 100%;
    background-color: transparent;
  }

  option {
    color: #FFFFFF;
  }

  .titulo {
    padding: 10px 0;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
  }

  .acoes {
    display: flex;
    justify-content: flex-end;
    margin: 16px;
    padding: 5px 0;
  }

  .btn-enviar {
    background-color: #319136;
    color: #FFFFFF;
    padding: 10px;
    font-size: 15px;
    border-radius: 6px;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  }

  .btn-enviar[disabled] {
    opacity: .3;
  }

  .container-veiculo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    .imagem-modelo {

    }
  }

  .posicao, .booleans {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>

<Window position="top-left">
    <form on:submit|preventDefault={enviar}>
        <div class="titulo">Criando Veículo</div>

        <div class="container-veiculo">
            <div class="imagem-modelo">
                <ImgCdn fileName="vrp/images/vehicles/{form.modelo}.png" alt=""
                        width="200px"/>
            </div>

            <div class="formulario">
                <div class="titulo">
                    Modelo
                </div>

                <input placeholder="Pesquisar" class="campo" bind:value={pesquisa}/>

                <select id="modelo" class="block" size="6"
                        bind:value={form.modelo}>
                    {#each listaVeiculos.filter(v => (v.toLowerCase().indexOf(pesquisa.toLowerCase()) !== -1) || !pesquisa.length) as veiculo}
                        <option value={veiculo.trim().toLowerCase()}>
                            { veiculo }
                        </option>
                    {/each}
                </select>
            </div>

            {#if errors.modelo}
                <InvalidField message={errors.modelo}/>
            {/if}
        </div>

        <div class="posicao">
            <div class="form-group">
                <label>Cor Primária</label>
                <!-- css-unused-selector -->
                <input placeholder="Selecione uma cor" class="campo" bind:value={form.corPrimaria} data-jscolor="{{}}"/>

                {#if errors.corPrimaria}
                    <InvalidField message={errors.corPrimaria}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Cor Secundária</label>
                <input placeholder="Selecione uma cor" class="campo" bind:value={form.corSecundaria} data-jscolor="{{}}"/>

                {#if errors.corSecundaria}
                    <InvalidField message={errors.corSecundaria}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Proprietário</label>
                <input placeholder="Informe um nick válido" class="campo" bind:value={form.proprietario}/>

                {#if errors.proprietario}
                    <InvalidField message={errors.proprietario}/>
                {/if}
            </div>
        </div>

        <div class="posicao">
            <div class="form-group">
                <label>Placa</label>
                <input placeholder="Ex: BRZ5" class="campo" bind:value={form.placa}/>

                {#if errors.placa}
                    <InvalidField message={errors.placa}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Valor Original</label>
                <input placeholder="Informe o valor" class="campo" bind:value={form.valorOriginal}/>

                {#if errors.valorOriginal}
                    <InvalidField message={errors.valorOriginal}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Valor Venda</label>
                <input placeholder="Informe o valor" class="campo" bind:value={form.valorVenda}/>

                {#if errors.valorVenda}
                    <InvalidField message={errors.valorVenda}/>
                {/if}
            </div>
        </div>

        <div class="booleans">
            <div class="form-group">
                <label>Trancado?</label>
                <input type="checkbox" bind:value={form.trancado}/>

                {#if errors.trancado}
                    <InvalidField message={errors.trancado}/>
                {/if}
            </div>

            <div class="form-group">
                <label>A Venda?</label>
                <input type="checkbox" bind:value={form.aVenda}/>

                {#if errors.aVenda}
                    <InvalidField message={errors.aVenda}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Motor ligado?</label>
                <input type="checkbox" bind:value={form.motor}/>

                {#if errors.motor}
                    <InvalidField message={errors.motor}/>
                {/if}
            </div>
        </div>

        <div class="posicao">
            <div class="form-group">
                <label>Transparência</label>
                <input placeholder="Informe o valor" class="campo" bind:value={form.transparencia}/>

                {#if errors.transparencia}
                    <InvalidField message={errors.transparencia}/>
                {/if}
            </div>

            <div class="form-group">
                <label>Tamanho</label>
                <input placeholder="Informe o valor" class="campo" bind:value={form.tamanho}/>

                {#if errors.tamanho}
                    <InvalidField message={errors.tamanho}/>
                {/if}
            </div>
        </div>

        <div class="flex items-center justify-between">
            <button type="submit" class="botao">Criar veículo</button>
            <button type="button" class="botao" on:click={fecharNui}>Cancelar</button>
        </div>
    </form>
</Window>
