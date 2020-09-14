<script lang="ts">
  import {writable} from 'svelte/store';
  import Window from '../components/Window.svelte';

  let playerName = 'Mandrakke_Army';

  let form = writable({
    playerName: playerName,
    playerEmail: '',
    playerCellPhone: '',
    password: '',
    passwordConfirmation: '',
  });
</script>

<style>

</style>

<Window>
    <div class="text-center py-3 text-lg">
        [:.:.Brazuca's Server.:.:] Sempre um passo a frente
    </div>

    <div class="bg-brz-gray-900 mb-3 full-wd rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <p class="text-gray-700 text-base text-center">
                O servidor ainda não está pronto, mas você já pode fazer o seu registro para receber avisos sobre o andamento do desenvolvimento!
            </p>
        </div>
    </div>

    <form>
        <div class="form-group">
            <label>Nick</label>
            <input
                type="text"
                class="form-control"
                bind:value={form.playerName}
                placeholder="Insira o nick que deseja utilizar" 
            />
        </div>
        <div class="form-group">
            <label>
              E-mail <small>Em breve será exigida verificação do e-mail</small>
            </label>
            <input
                type="text"
                class="form-control"
                bind:value={form.playerEmail}
                placeholder="Insira o seu e-mail" 
            />
        </div>
        <div class="form-group">
            <label>
              Celular/Telemóvel <small>Em breve será exigida verificação do celular</small>
            </label>
            <input
                type="text"
                class="form-control"
                bind:value={form.playerCellPhone}
                placeholder="Insira o número do seu celular"
            />
        </div>
        <div class="form-group">
            <label>Senha</label>
            <input
                type="password"
                class="form-control"
                bind:value={form.password}
                placeholder="Escolha uma senha para sua conta"
            />
        </div>

        <div class="form-group">
            <label>Confirme a senha</label>
            <input
                type="password"
                class="form-control"
                bind:value={form.passwordConfirmation}
                placeholder="Confirme a senha escolhida"
            />
        </div>

        <div class="flex justify-end items-center">
            <button type="submit" class="btn btn-primary">Registrar</button>
        </div>
    </form>
</Window>
