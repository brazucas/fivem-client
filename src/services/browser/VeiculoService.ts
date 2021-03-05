import { call } from './BrowserBridgeService';
import { BrazucasEventos, DadosVeiculo } from "../../interfaces/brazucas";

export function criarVeiculo(dados: DadosVeiculo): Promise<DadosVeiculo> {
  return call<DadosVeiculo>(BrazucasEventos.CRIAR_VEICULO, dados);
}
