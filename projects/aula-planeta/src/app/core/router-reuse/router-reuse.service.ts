import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class RouteReuseService implements RouteReuseStrategy {
  // public static handlers: { [key: string]: DetachedRouteHandle } = {};
  // /** means to allow reuse for all routes. If you have a route that you don't want to use, you can add some business logic to judge */
  // public shouldDetach(route: ActivatedRouteSnapshot): boolean {
  //   return true;
  // }
  // /** Fires when the route leaves. Store path snapshot & component current instance object by path as key */
  // public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  //   RouteReuseService.handlers[route.routeConfig.path] = handle
  // }
  // /** If path is in the cache, it is considered to allow routing to be restored */
  // public shouldAttach(route: ActivatedRouteSnapshot): boolean {
  //   return !!route.routeConfig && !!RouteReuseService.handlers[route.routeConfig.path]
  // }
  // /** Get a snapshot from the cache, or nul if none*/
  // public retrieve_bak(route: ActivatedRouteSnapshot): DetachedRouteHandle {
  //   if (!route.routeConfig) {
  //     return null
  //   }
  //   return RouteReuseService.handlers[route.routeConfig.path]
  // }
  // public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
  //   if (!route.routeConfig) {
  //     return null;
  //   }
  //   if (route.routeConfig.loadChildren) {
  //     return null;
  //   }
  //   return RouteReuseService.handlers[route.routeConfig.path];
  // }
  // /** Enter route trigger to determine if the same route */
  // public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
  //   return future.routeConfig === curr.routeConfig
  // }

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  private static waitDelete: string;

  public static deleteRouteSnapshot(name: string): void {
    if (RouteReuseService.handlers[name]) {
      delete RouteReuseService.handlers[name];
    } else {
      RouteReuseService.waitDelete = name;
    }
  }

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // In routing Collection apply this strategy on components to be cached . Like data: {reuse: true} after component separated by coma.

    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    console.log('checking if this route should be re used or not', route);
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse ? shouldReuse = true : shouldReuse = false;
    }
    return shouldReuse;
    // return true;
  }

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (RouteReuseService.waitDelete && RouteReuseService.waitDelete == this.getRouteUrl(route)) {
      RouteReuseService.waitDelete = null;
      return;
    }
    RouteReuseService.handlers[this.getRouteUrl(route)] = handle;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!RouteReuseService.handlers[this.getRouteUrl(route)];
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    if (route.routeConfig.loadChildren) {
      return null;
    }
    return RouteReuseService.handlers[this.getRouteUrl(route)];
  }

  //   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
  //     if (!route.routeConfig) return null;
  //     if(route.routeConfig.loadChildren) return null;
  //     return this.handlers[route.routeConfig.path];
  //  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url.replace(/\//g, '_');
  }
}
