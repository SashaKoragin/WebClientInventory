import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthIdentification, AuthIdentificationSignalR } from '../../../Post RequestService/PostRequest';
import { Autorization } from '../../../Inventory/ModelInventory/InventoryModel';


@Component({
    // selector: 'inventarlogin',
    templateUrl: '../Html/Inventory.html',
    styleUrls: ['../Html/Inventory.css']
})
export class LoginInventarization {

    constructor(public authService: AuthIdentification, public router: Router, private signalR: AuthIdentificationSignalR) { }

    login() {
        try {
            this.authService.login().subscribe((model: Autorization) => {
                this.authService.autorization = model;
                if (this.authService.autorization.errorAutorizationField === null) {
                    this.signalR.createconection(this.authService);
                    this.authService.AddRuleService(this.authService.autorization.ruleField)
                    this.signalR.startserverSignalR();
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/Inventory';
                    let navigationExtras: NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };
                        this.authService.isLoggedIn = true;
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