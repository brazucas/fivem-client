import { call } from './RageMPBrowserService';
import { BrazucasEventos, DadosLogin, DadosRegistro, Jogador } from "../../interfaces/brazucas";

export function autenticar(usuario: string, senha: string): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.AUTENTICAR_JOGADOR, <DadosLogin>{
    usuario,
    senha,
  });
}

export function registrar(dados: DadosRegistro): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.REGISTRAR_JOGADOR, dados);
}

