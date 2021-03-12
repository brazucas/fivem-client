import { call } from './BrowserBridgeService';
import { BrazucasEventos, DadosBanirJogador } from "../../interfaces/brazucas";

export const banirJogador = (dados: DadosBanirJogador): Promise<DadosBanirJogador> => {
  return call<DadosBanirJogador>(BrazucasEventos.BANIR_JOGADOR, dados);
}