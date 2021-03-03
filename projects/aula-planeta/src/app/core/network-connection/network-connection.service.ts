import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OnDestroy, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

export enum ConnectionStatusEnum {
  Online,
  Offline
}


@Injectable({
  providedIn: 'root'
})
export class NetworkConnection implements OnDestroy {

  private static destroy$: Subject<void> = new Subject<void>();
  public static status: ConnectionStatusEnum = ConnectionStatusEnum.Offline;
  public static isConnected: boolean = false;
  private static online$: Observable<Event>;
  private static offline$: Observable<Event>;

  public static init() {
    NetworkConnection.online$ = fromEvent(window, 'online');
    NetworkConnection.offline$ = fromEvent(window, 'offline');

    NetworkConnection.status = navigator.onLine ? 0 : 1;
    NetworkConnection.isConnected = navigator.onLine;

    NetworkConnection.online$.pipe(
      takeUntil(NetworkConnection.destroy$)).subscribe(e => {
        console.log('Online');
        NetworkConnection.status = ConnectionStatusEnum.Online;
        NetworkConnection.isConnected = true;
      });

    NetworkConnection.offline$.pipe(
      takeUntil(this.destroy$)).subscribe(e => {
        console.log('Offline');
        NetworkConnection.status = ConnectionStatusEnum.Offline;
        NetworkConnection.isConnected = false;
      });
  }

  ngOnDestroy() {
    NetworkConnection.destroy$.next();
    NetworkConnection.destroy$.complete();
  }

  constructor() {
    NetworkConnection.init();
  }

}

new NetworkConnection();