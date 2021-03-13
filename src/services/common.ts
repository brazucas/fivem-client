import { writable } from "svelte/store";
import {
  Creditos,
  Dinheiro,
  Fome,
  ForcaFisica,
  Jogador,
  Sede,
  ServidorInfo,
  Sono,
  VoiceChatListener
} from "../interfaces/brazucas";
import Swal from 'sweetalert2';
import { BehaviorSubject } from "rxjs";

export const playerHudMenuAtivo = new BehaviorSubject<boolean>(false);
export const voiceChatListeners = writable<Array<VoiceChatListener>>([]);

export const jogador = writable<Jogador>({
  id: null,
  nome: 'Carregando...',
  email: '',
  fome: Fome.MAXIMO,
  sono: Sono.MAXIMO,
  forcaFisica: ForcaFisica.MAXIMO,
  sede: Sede.MAXIMO,
  dinheiro: Dinheiro.MINIMO,
  creditos: Creditos.MINIMO,
});

export const servidor = writable<ServidorInfo>({
  jogadoresOnline: 0,
  jogadores: [],
});

export const mostrarErro = (error: any) => {
  console.error(error);
  Swal.fire({
    title: 'Oops!',
    text: obterMensagemDeErro(error),
    icon: 'error',
    confirmButtonText: 'Fechar',
  })
}

export const toast = (mensagem: string, tipo = 'success', posicao = 'bottom', duracao = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: posicao as any,
    showConfirmButton: false,
    timer: duracao,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  Toast.fire({
    icon: tipo as any,
    title: mensagem
  });
}

const obterMensagemDeErro = (e) => {
  return 'Um erro ocorreu ao processar sua solicitação, tente novamente mais tarde.';
}
