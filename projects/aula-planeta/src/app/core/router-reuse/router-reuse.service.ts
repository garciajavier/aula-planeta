import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class RouteReuseService implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {}

  private static waitDelete: string

  public static deleteRouteSnapshot(name: string): void {
    if (RouteReuseService.handlers[name]) {
      delete RouteReuseService.handlers[name];
    } else {
      RouteReuseService.waitDelete = name;
    }
  }


  public shouldDetach(route: ActivatedRouteSnapshot): boolean {

    // In routing Collection apply this strategy on components to be cached . Like data: {reuse: true} after component separated by coma.

    // if (!route.routeConfig || route.routeConfig.loadChildren) {
    //   return false;
    // }
    // let shouldReuse = false;
    // console.log('checking if this route should be re used or not', route);
    // if (route.routeConfig.data) {
    //   route.routeConfig.data.reuse ? shouldReuse = true : shouldReuse = false;
    // }
    // return shouldReuse;
    return true;
  }


  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (RouteReuseService.waitDelete && RouteReuseService.waitDelete == this.getRouteUrl(route)) {
      RouteReuseService.waitDelete = null
      return;
    }
    RouteReuseService.handlers[this.getRouteUrl(route)] = handle
  }


  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!RouteReuseService.handlers[this.getRouteUrl(route)]
  }


  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null
    }
    return RouteReuseService.handlers[this.getRouteUrl(route)]
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url.replace(/\//g, '_')
  }
}