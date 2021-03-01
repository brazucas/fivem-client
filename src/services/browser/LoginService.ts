import { call } from './RageMPBrowserService';
import { BrazucasEventos, DadosLogin, Jogador } from "../../interfaces/brazucas";

export function autenticar(usuario, senha): Promise<Jogador> {
  return call<Jogador>(BrazucasEventos.AUTENTICAR_JOGADOR, <DadosLogin>{
    usuario,
    senha,
  });
}

