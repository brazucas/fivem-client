<script lang="ts">
  import Window from '../components/Window.svelte';
  import { autenticar } from '../services/browser/LoginService';
  import { jogador, mostrarErro } from '../services/common';

  let playerName = 'Mandrakke_Army';

  let form = {
    playerName: playerName,
    password: '',
  };

  const enviar = async () => {
    try {
      const dadosJogador = await autenticar(form.playerName, form.password);
      jogador.set(dadosJogador);
    } catch (e) {
      await mostrarErro(e);
    }
  }
</script>

<Window>
    <div class="text-lg">
        Bem vindo de volta, {playerName}!
    </div>

    <form on:submit|preventDefault={enviar}>
        <div class="form-group">
            <label>Nick</label>
            <input type="text" class="form-control" bind:value={form.playerName}
                   placeholder="Insira seu nick">
        </div>
        <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" bind:value={form.password} placeholder="Sua senha">
        </div>

        <div class="flex justify-between items-center">
            <button type="submit" class="btn btn-primary">Entrar</button>

            <div>
                Esqueci minha senha
            </div>
        </div>
    </form>
</Window>
