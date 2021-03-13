import { call } from './BrowserBridgeService';
import { BrazucasEventos, DadosLogin, DadosRecuperarAcesso, DadosRegistro, Jogador } from "../../interfaces/brazucas";

export function autenticar(usuario: string, senha: string): Promise<Jogador> {
  return call<Jogador>('brz_player', BrazucasEventos.AUTENTICAR_JOGADOR, <DadosLogin>{
    usuario,
    senha,
  });
}

export function registrar(dados: DadosRegistro): Promise<Jogador> {
  return call<Jogador>('brz_player', BrazucasEventos.REGISTRAR_JOGADOR, dados);
}

export function recuperarAcesso(codigo: string, novaSenha: string): Promise<Jogador> {
  return call<Jogador>('brz_player', BrazucasEventos.RECUPERAR_ACESSO, <DadosRecuperarAcesso>{
    codigo,
    senha: novaSenha,
  });
}

