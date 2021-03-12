import { call } from './BrowserBridgeService';
import { BrazucasEventos, DadosBanirJogador } from "../../interfaces/brazucas";
import { of } from "rxjs";
import { map } from "rxjs/operators";

export const banirJogador = (dados: DadosBanirJogador): Promise<DadosBanirJogador> => {
  return call<DadosBanirJogador>('brz_admin', BrazucasEventos.BANIR_JOGADOR, dados);
}

export const buscarAutocompleteJogadores = (texto: string): Promise<{
  label: string;
  value: string | number;
}[]> => {
  // return call<AutocompleteJogadores>('brz_admin', BrazucasEventos.AUTOCOMPLETE_JOGADORES, texto);

  return of(<{
    label: string;
    value: string | number;
  }[]>[
    {
      label: 'Mandrakke_Army',
      value: 1,
    },
    {
      label: 'GermanB',
      value: 2,
    },
    {
      label: 'Alexandre',
      value: 1
    },
    {
      label: 'Eduardo',
      value: 1
    },
    {
      label: 'Henrique',
      value: 1
    },
    {
      label: 'Murilo',
      value: 1
    },
    {
      label: 'Theo',
      value: 1
    },
    {
      label: 'André',
      value: 1
    },
    {
      label: 'Enrico',
      value: 1
    },
    {
      label: 'Henry',
      value: 1
    },
    {
      label: 'Nathan',
      value: 1
    },
    {
      label: 'Thiago',
      value: 1
    },
    {
      label: 'Antônio',
      value: 1
    },
    {
      label: 'Enzo',
      value: 1
    },
    {
      label: 'Ian',
      value: 1
    },
    {
      label: 'Otávio',
      value: 1
    },
    {
      label: 'Thomas',
      value: 1
    },
    {
      label: 'Augusto',
      value: 1
    },
    {
      label: 'Erick',
      value: 1
    },
    {
      label: 'Isaac',
      value: 1
    },
    {
      label: 'Pietro',
      value: 1
    },
    {
      label: 'Vicente',
      value: 1
    },
    {
      label: 'Breno',
      value: 1
    },
    {
      label: 'Felipe',
      value: 1
    },
    {
      label: 'João',
      value: 1
    },
    {
      label: 'Rafael',
      value: 1
    },
    {
      label: 'Vinícius',
      value: 1
    },
    {
      label: 'Bruno',
      value: 1
    },
    {
      label: 'Fernando',
      value: 1
    },
    {
      label: 'Kaique',
      value: 1
    },
    {
      label: 'Raul',
      value: 1
    },
    {
      label: 'Vitor',
      value: 1
    },
    {
      label: 'Caio',
      value: 1
    },
    {
      label: 'Francisco',
      value: 1
    },
    {
      label: 'Leonardo',
      value: 1
    },
    {
      label: 'Rian',
      value: 1
    },
    {
      label: 'Yago',
      value: 1
    },
    {
      label: 'Cauã',
      value: 1
    },
    {
      label: 'Frederico',
      value: 1
    },
    {
      label: 'Luan',
      value: 1
    },
    {
      label: 'Ricardo',
      value: 1
    },
    {
      label: 'Ygor',
      value: 1
    },
    {
      label: 'Daniel',
      value: 1
    },
    {
      label: 'Guilherme',
      value: 1
    },
    {
      label: 'Lucas',
      value: 1
    },
    {
      label: 'Rodrigo',
      value: 1
    },
    {
      label: 'Yuri',
      value: 1
    },
    {
      label: 'Danilo',
      value: 1
    },
    {
      label: 'Gustavo',
      value: 1
    },
    {
      label: 'Mathias',
      value: 1
    },
    {
      label: 'Samuel',
      value: 1
    }
  ]).pipe(
    map((nomes) =>
      nomes.filter((n) => n.label.toLowerCase().indexOf(texto.toLowerCase()) !== -1))
  ).toPromise();
}
