export enum BrazucasEventos {
  BROWSER = 'browser',
  SERVER = 'server',
  AUTENTICAR_JOGADOR = 'AutenticarJogador',
  CRIAR_VEICULO = 'CriarVeiculo',
  REGISTRAR_JOGADOR = 'RegistrarJogador',
  AUTENTICACAO_RESULTADO = 'AutenticacaoResultado',
  REGISTRO_RESULTADO = 'RegistroResultado',
  DADOS_JOGADOR = 'DadosJogador',
  ATUALIZAR_DADOS_JOGADOR = 'AtualizarDadosJogador',
  INICIAR_NAVEGADOR = 'IniciarNavegador',
  CURSOR = 'cursor',
  HABILITAR_VOICE_CHAT = 'HabilitarVoiceChat',
  DESABILITAR_VOICE_CHAT = 'DesabilitarVoiceChat',
  ANIMACAO_VOICE_CHAT = 'AnimacaoVoiceChat',
  ATUALIZAR_FOME = 'AtualizarFome',
  ATUALIZAR_SEDE = 'AtualizarSede',
  ATUALIZAR_SONO = 'AtualizarSono',
  ATUALIZAR_FORCA_FISICA = 'AtualizarForcaFisica',
  VISUALIZAR_ANIMACAO = 'VisualizarAnimacao',
}

export interface AutenticacaoResultado {
  autenticado: boolean;
  credenciaisInvalidas?: boolean;
}

export interface RegistroResultado {
  registrado: boolean;
  erro?: boolean;
  mensagem?: string;
  jogador?: Jogador;
}

export interface DadosLogin {
  usuario: string;
  senha: string;
}

export interface DadosRegistro {
  email: string,
  celular: string,
  senha: string,
  senhaConfirma: string,
}

export interface Jogador {
  nome: string,
  email: string,
  celular?: string,
  posicaoX?: number,
  posicaoY?: number,
  posicaoZ?: number,
  fome: number,
  sono: number,
  forcaFisica: number,
  sede: number,
  dinheiro: number,
  creditos: number,
}

export enum Fome {
  MAXIMO = 100,
  MINIMO = 0,
}

export enum Sono {
  MAXIMO = 100,
  MINIMO = 0,
}

export enum Sede {
  MAXIMO = 100,
  MINIMO = 0,
}

export enum ForcaFisica {
  MAXIMO = 100,
  MINIMO = 0,
}

export enum Dinheiro {
  MAXIMO = 999999999,
  MINIMO = 0,
}

export enum Creditos {
  MAXIMO = 99999,
  MINIMO = 0,
}
