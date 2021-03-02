import { fromEvent, Observable } from 'rxjs';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

export class NetworkConnection {

  public static status: ConnectionStatusEnum = ConnectionStatusEnum.Offline;
  private static online$: Observable<Event>;
  private static offline$: Observable<Event>;

  public static init() {
    NetworkConnection.online$ = fromEvent(window, 'online');
    NetworkConnection.offline$ = fromEvent(window, 'offline');

    NetworkConnection.status = navigator.onLine ? 0 : 1;

    NetworkConnection.online$.subscribe(e => {
      console.log('Online');
      NetworkConnection.status = ConnectionStatusEnum.Online;
    });

    NetworkConnection.offline$.subscribe(e => {
      console.log('Offline');
      NetworkConnection.status = ConnectionStatusEnum.Offline;
    });
  }

  constructor() {
    NetworkConnection.init();
  }

}

new NetworkConnection();