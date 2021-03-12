import { call } from './BrowserBridgeService';
import { BrazucasEventos, DadosVeiculo } from "../../interfaces/brazucas";

export function criarVeiculo(dados: DadosVeiculo): Promise<DadosVeiculo> {
  return call<DadosVeiculo>('brz_admin_veiculos', BrazucasEventos.CRIAR_VEICULO, dados);
}
