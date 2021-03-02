<script lang="ts">
  import Window from '../components/Window.svelte';
  import { jogador, mostrarErro } from '../services/common';
  import { object, ref, string } from "yup";
  import { extractErrors } from "../helpers";
  import InvalidField from "../components/Form/InvalidField.svelte";
  import { checkPassword } from "../validators";
  import { recuperarAcesso } from "../services/browser/LoginService";

  const formValidation = object().shape({
    code: string()
      .required('O código é obrigatório')
      .min(8, 'O código deve possuir 8 caracteres')
      .max(8, 'O código deve possuir 8 caracteres'),
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
    code: '',
    password: '',
    passwordConfirmation: '',
  };

  let errors = {};

  const enviar = async () => {
    try {
      await formValidation.validate(form, {abortEarly: false});

      try {
        const dadosJogador = await recuperarAcesso(form.code, form.password);
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
        Um e-mail foi enviado para o endereço associado a sua conta.
    </div>

    <form on:submit|preventDefault={enviar}>
        <div class="form-group">
            <label>Código</label>
            <input type="text" name="code" class="form-control" bind:value={form.code}
                   placeholder="Insira o código recebido por e-mail">
            {#if errors.code}
                <InvalidField message={errors.code}/>
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
