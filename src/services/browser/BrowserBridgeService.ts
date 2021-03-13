import { Subject } from "rxjs";
import type { ServerEvent } from "../../interfaces/bridge";
import { BrazucasEventos } from "../../interfaces/brazucas";
import 'ragemp-cef';

export const serverEvent$: Subject<ServerEvent> = new Subject();

export async function call<T>(resource: string, event: string, data: any): Promise<T> {
  const eventId = Math.round(Math.random() * 10000000);

  console.log(`Enviando evento ${BrazucasEventos.BROWSER}\nID: ${eventId}\nnome: ${event}\ndados: ${JSON.stringify(data)}`);

  const response = await fetch(`http://${resource}/${event}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

function serverEvent(eventId: number, event: string, data: any) {
  console.log(`Evento recebido para o navegador ${this.browserName$.value}: ${event} ${JSON.stringify(data)}`);
  serverEvent$.next({
    event: event,
    data: data,
    eventId: eventId,
  });
}

export function fecharNui() {
  return call('brz_nui', 'Fechar', {})
}
