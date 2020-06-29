import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthIdentification, PostInventar, AuthIdentificationSignalR } from '../../Post RequestService/PostRequest';
import { Autorization } from '../../Inventory/ModelInventory/InventoryModel';
import { deserialize } from 'class-transformer';

@Component({
    // selector: 'inventarlogin',
    templateUrl: '../Html/Inventory.html',
    styleUrls: ['../Html/Inventory.css']
})
export class LoginInventarization {

    constructor(public authService: AuthIdentification, public router: Router, public selectall: PostInventar, private signalR: AuthIdentificationSignalR) { }

    login() {
        try {

            this.authService.login().subscribe((model: Autorization) => {
                this.authService.autorization = model;
                if (this.authService.autorization.errorAutorizationField === null) {
                    this.signalR.createconection(this.authService);
                    this.signalR.startserverSignalR();
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/Inventory';
                    this.authService.isLoggedIn = true;
                    let navigationExtras: NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };
                    this.router.navigate([redirect], navigationExtras);
                    return;
                }
                return;
            });

        } catch (e) {
            alert(e);
        };
    }

    logout() {
        this.authService.logout();
        this.signalR.stopserverSignalR();
    }
}