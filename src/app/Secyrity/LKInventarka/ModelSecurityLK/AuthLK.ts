import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Route } from '@angular/router';
import { AuthIdentification } from '../../../Post RequestService/PostRequest';
@Injectable({
    providedIn: 'root'
})
export class AuthLk implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthIdentification, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {

        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedInLk) { return true; }
        this.authService.redirectUrlLk = url;
        this.router.navigate(['/LkUserLogin']);
        return false;
    }
}