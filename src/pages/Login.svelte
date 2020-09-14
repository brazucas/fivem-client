<script lang="ts">
  import { writable } from 'svelte/store';

  let playerName = 'Mandrakke_Army';

  let form = writable({
    playerName: playerName,
    password: '',
  });
</script>

<div class="text-white">
    <div class="text-lg">
        Bem vindo de volta, {playerName}!
    </div>

    <form>
        <label>
            <span>Nick:</span>
            <input type="text" bind:value={$form.playerName}/>
        </label>

        <label>
            <span>Senha:</span>
            <input type="text" bind:value={$form.password}/>
        </label>

        <div class="flex content-between items-center">
            <button class="">
                Entrar
            </button>

            <div>
                Esqueci minha senha
            </div>
        </div>
    </form>
</div>
