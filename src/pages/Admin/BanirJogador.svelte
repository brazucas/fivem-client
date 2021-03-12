<script lang="ts">
  import Window from '../../components/Window.svelte';
  import InputAutoComplete from "../../components/InputAutoComplete.svelte";
  import {mostrarErro, servidor, toast} from '../../services/common';
  import { object, number, string } from 'yup';
  import type { DadosBanirJogador } from '../../interfaces/brazucas';
  import { extractErrors } from '../../helpers';
  import InvalidField from '../../components/Form/InvalidField.svelte';
  import { banirJogador } from '../../services/browser/AdminService';
  
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

  let formValidator = object().shape({
    playerId: number().typeError('O jogador é obrigatório').required('O jogador é obrigatório'),
    timeUnit: string().required('A unidade de tempo é obrigatória'),
    timeValue: number().when('timeUnit', {
      is: 'perm',
      then: number().nullable(),
      otherwise: number().typeError('O tempo de banimento é obrigatório').required('O tempo de banimento é obrigatório')
    }),
    reason: string().required('O motivo do banimento é obrigatório')
  })

  let form: DadosBanirJogador = {
    playerId: null,
    timeValue: 0,
    timeUnit: '',
    reason: '',
  }

  let errors: Record<string, string> = {};

  const enviar = async () => {
    try {
      await formValidator.validate(form, { abortEarly: false });

      try {
        await banirJogador({
          ...form,
        });

        toast('Jogador banido com sucesso!')
      } catch (e) {
        await mostrarErro(e);
      }

    } catch (e) {
      errors = extractErrors(e);
      console.error(errors);
    }
  }

  $: console.log(form);
  
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Window>
  <form on:submit|preventDefault={enviar}>
    <div class="flex items-start">
      <div class="form-group mr-2 w-1/2">
        <label>Jogador</label>
        <InputAutoComplete
          bind:value={form.playerId}
          placeholder="Pesquisar jogador..."
          options="{$servidor.jogadores.map(jogador => ({value: jogador.id, label: jogador.nome}))}"
        />
        {#if errors.playerId}
          <InvalidField message={errors.playerId}/>
        {/if}
      </div>
      <div class="form-group w-1/2">
        <label>Tempo</label>
        <div class="flex">
          <div class="form-group mb-0 mr-2 w-2/3">
            <input
              disabled="{form.timeUnit === 'perm'}"
              type="number"
              min="0"
              name="banTimeValue"
              class="form-control"
              placeholder="Tempo de banimento"
              bind:value="{form.timeValue}"
            >
            {#if errors.timeValue}
              <InvalidField message={errors.timeValue}/>
            {/if}
          </div>
          <div class="form-group mb-0 w-1/3">
            <select class="form-control" bind:value="{form.timeUnit}">
              <option value="" selected disabled hidden>Selecione</option>
              <option value="mins">minutos</option>
              <option value="hours">horas</option>
              <option value="days">dias</option>
              <option value="months">meses</option>
              <option value="perm">permanente</option>
            </select>
            {#if errors.timeUnit}
              <InvalidField message={errors.timeUnit}/>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
        <label>Motivo</label>
        <input
          bind:value="{form.reason}"
          type="text"
          name="banReason"
          class="form-control"
          placeholder="Informe o motivo"
        >
        {#if errors.reason}
          <InvalidField message={errors.reason}/>
        {/if}
    </div>
    <div class="flex justify-end items-center">
      <button type="submit" class="btn btn-danger">Banir</button>
    </div>
  </form>
</Window>