<script lang="ts">
  import {writable} from 'svelte/store';
  import Window from '../components/Window.svelte';

  let playerName = 'Mandrakke_Army';

  let form = writable({
    playerName: playerName,
    password: '',
  });
</script>

<Window>
    <div class="text-lg">
        Bem vindo de volta, {playerName}!
    </div>

    <form>
        <div class="form-group">
            <label>Nick</label>
            <input type="text" class="form-control" bind:value={form.playerName}
                   placeholder="Insira seu nick conforme o cadastro">
        </div>
        <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" bind:value={form.password} placeholder="Sua senha no servidor">
        </div>

        <div class="flex justify-between items-center">
            <button type="submit" class="btn btn-primary">Entrar</button>

            <div>
                Esqueci minha senha
            </div>
        </div>
    </form>
</Window>
