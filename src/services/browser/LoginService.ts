import { call } from './RageMPBrowserService';
import { BrazucasEventos, DadosLogin, DadosRecuperarAcesso, DadosRegistro, Jogador } from "../../interfaces/brazucas";

export function autenticar(usuario: string, senha: string): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.AUTENTICAR_JOGADOR, <DadosLogin>{
    usuario,
    senha,
  });
}

export function registrar(dados: DadosRegistro): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.REGISTRAR_JOGADOR, dados);
}

export function recuperarAcesso(codigo: string, novaSenha: string): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.RECUPERAR_ACESSO, <DadosRecuperarAcesso>{
    codigo,
    senha: novaSenha,
  });
}

