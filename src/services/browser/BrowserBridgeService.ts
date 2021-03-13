import { from, Subject } from "rxjs";
import type { ServerEvent } from "../../interfaces/bridge";
import 'ragemp-cef';
import { map } from "rxjs/operators";
import { jogador } from "../common";
import { get } from "svelte/store";

export const serverEvent$: Subject<ServerEvent> = new Subject();

export async function call<T>(resource: string, event: string, data: any): Promise<T> {
  const eventId = Math.round(Math.random() * 10000000);

  console.log(`Enviando evento ${event}\nResource: ${resource}\nID: ${eventId}\ndados: ${JSON.stringify(data)}`);

  const _data = {
    eventId,
    data,
    user_id: get(jogador).id
  };

  const response = await fetch(`http://${resource}/${event}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(_data)
  });

  return await from(response.text()).pipe(map((r) => JSON.parse(r))).toPromise();
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
