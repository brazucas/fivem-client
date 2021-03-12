import { Subject } from "rxjs";
import type { ServerEvent } from "../../interfaces/bridge";
import { BrazucasEventos } from "../../interfaces/brazucas";
import 'ragemp-cef';

export const serverEvent$: Subject<ServerEvent> = new Subject();

export function call<T>(resource: string, event: string, data: any): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const eventId = Math.round(Math.random() * 10000000);

    console.log(`Enviando evento ${BrazucasEventos.BROWSER}\nID: ${eventId}\nnome: ${event}\ndados: ${JSON.stringify(data)}`);
    // mp.trigger(BrazucasEventos.BROWSER, eventId, event, JSON.stringify(data));

    await fetch(`http://${resource}/${event}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const subscriber = serverEvent$.subscribe((serverEvent: ServerEvent) => {
      console.debug(`[EVENTO] (ID ${eventId}) ${JSON.stringify(serverEvent)}`);

      if (typeof this[serverEvent.event] === 'function') {
        this[serverEvent.event](serverEvent.data);
      }

      if (serverEvent.eventId === eventId) {
        clearTimeout(timeout);
        resolve(serverEvent.data);
        subscriber.unsubscribe();
      }
    });

    const timeout = setTimeout(() => {
      subscriber.unsubscribe();
      reject('timeout');
    }, 10000);
  });
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
