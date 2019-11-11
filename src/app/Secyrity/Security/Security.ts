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

    constructor(public authService: AuthIdentification, public router: Router,public selectall:PostInventar, private signalR: AuthIdentificationSignalR) { }

    login() {
        try {
        if ((this.authService.password !== null) &&
            (this.authService.logins !== null)) {
            this.authService.login().subscribe((model) => {
                if (model) {
                    this.authService.fullSelect = deserialize(Autorization, model.toString());
                    this.signalR.createconection(this.authService.fullSelect.Users);
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
                this.authService.error = 'Не правильный Логин/Пароль';
                return;
            });
        } else {
            this.authService.error = 'Не введен Логин/Пароль';
            }
        } catch (e) {
            alert(e);
        };
    }

    logout() {
        this.authService.logout();
        this.signalR.stopserverSignalR();
    }
}