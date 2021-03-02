<script lang="ts">
  import Window from '../components/Window.svelte';
  import { registrar } from '../services/browser/LoginService';
  import { jogador, mostrarErro } from '../services/common';
  import { object, ref, string } from "yup";
  import { brazilianPhoneMask, extractErrors } from "../helpers";
  import InvalidField from "../components/Form/InvalidField.svelte";
  import { checkBrazilianPhone, checkPassword, checkPlayerName } from "../validators";
  import { imask } from "svelte-imask";

  const formValidation = object().shape({
    playerName: string()
      .required('O nick é obrigatório')
      .min(3, 'O nick deve ter no mínimo 3 caracteres')
      .max(25, 'O nick deve ter no mínimo 25 caracteres')
      .test('nickInvalido', 'O nick é inválido. Apenas Nome e Nome_Sobrenome são aceitos e cada nome deve ter no mínimo 3 letras. Ex: Abu, Mandrakke, Mandrakke_Army', checkPlayerName),
    email: string().required('O e-mail é obrigatório').email('O e-mail é inválido'),
    phone: string()
      .required('O telefone é obrigatório')
      .test('telefoneInvalido', 'O telefone é inválido.', checkBrazilianPhone),
    password: string()
      .required('A senha é obrigatória')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .max(16, 'A senha deve ter no máximo 16 caracteres')
      .test('senhaInvalida', 'A senha é inválida. São permitidas letras, números e caracteres especiais', checkPassword),
    passwordConfirmation: string()
      .required('A confirmação é obrigatória')
      .oneOf([ref('password'), null], 'As senhas devem ser iguais')
  });

  let form = {
    playerName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
  };

  let errors = {};

  const enviar = async () => {
    try {
      await formValidation.validate(form, {abortEarly: false});

      try {
        const dadosJogador = await registrar({
          usuario: form.playerName,
          email: form.email,
          celular: form.phone,
          senha: form.password,
        });
        jogador.set(dadosJogador);
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
  .subtitulo {
    text-align: center;
    background-color: #222;
    border-radius: 3px;
    color: #FFFFFF;
    margin: 8px;
    font-size: 12px;
    padding: 20px;
  }
</style>

<Window canClose={false}>
    <div class="subtitulo">
        O servidor ainda não está pronto, mas você já pode fazer o seu registro para receber avisos sobre
        o andamento do desenvolvimento!
    </div>

    <form on:submit|preventDefault={enviar}>
        <div class="form-group">
            <label>Nick</label>
            <input type="text" name="playerName" class="form-control" bind:value={form.playerName}
                   placeholder="Insira seu nick">
            {#if errors.playerName}
                <InvalidField message={errors.playerName}/>
            {/if}
        </div>
        <div class="form-group">
            <label>E-mail <small>Em breve será exigida verificação do e-mail</small></label>
            <input type="text" name="email" class="form-control" bind:value={form.email}
                   placeholder="Informe um e-mail válido">
            {#if errors.email}
                <InvalidField message={errors.email}/>
            {/if}
        </div>
        <div class="form-group">
            <label>Celular/Telemóvel <small>Em breve será exigida verificação do celular</small></label>

            <div class="flex items-center content-center">
                <div class="mr-2">
                    <select class="form-control">
                        <option value="55">+55 (Brasil)</option>
                        <!--                        <option value="244">+244 (Angola)</option>-->
                        <!--                        <option value="258">+258 (Moçambique)</option>-->
                        <!--                        <option value="351">+351 (Portugal)</option>-->
                    </select>
                </div>

                <input use:imask={brazilianPhoneMask} type="text" name="phone" class="form-control mr-2"
                       bind:value={form.phone}
                       placeholder="Informe um número válido">
            </div>

            {#if errors.phone}
                <InvalidField message={errors.phone}/>
            {/if}
        </div>

        <div class="form-group">
            <label>Senha</label>
            <input type="password" name="password" class="form-control" bind:value={form.password}
                   placeholder="Sua senha">
            {#if errors.password}
                <InvalidField
                        message={errors.password}/>
            {/if}
        </div>

        <div class="form-group">
            <label>Confirme a senha</label>
            <input type="password" name="passwordConfirmation" class="form-control"
                   bind:value={form.passwordConfirmation}
                   placeholder="Confirme a senha">
            {#if errors.passwordConfirmation}
                <InvalidField message={errors.passwordConfirmation}/>
            {/if}
        </div>

        <div class="flex justify-between items-center">
            <button type="submit" class="btn btn-primary">Registrar</button>

            <div>
                Precisa de ajuda?
            </div>
        </div>
    </form>
</Window>
