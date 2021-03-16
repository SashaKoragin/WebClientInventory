import { Component } from '@angular/core';
import { AuthIdentification } from '../../../Post RequestService/PostRequest';
import { Router, NavigationExtras } from '@angular/router';
import { Autorization } from '../../../Inventory/ModelInventory/InventoryModel';




@Component({
    templateUrl: '../Html/LkSecurity.html',
    styleUrls: ['../Html/LkSecurity.css']
})
export class LoginLk {

    constructor(public authService: AuthIdentification, public router: Router) { }


    loginLk() {
        this.authService.loginLk().subscribe((model: Autorization) => {
            this.authService.autorizationLk = model;
            if (this.authService.autorizationLk.errorAutorizationField === null) {
                let redirect = this.authService.redirectUrlLk ? this.authService.redirectUrlLk : '/LkUser';
                this.authService.AddRuleService(this.authService.autorizationLk.ruleField)
                let navigationExtras: NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };
                this.authService.isLoggedInLk = true;
                this.router.navigate([redirect], navigationExtras);
                return;
            }
            return;
        });
    }

    logoutLk() {
        this.authService.logoutLk();
    }

}