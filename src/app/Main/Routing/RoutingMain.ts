import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthInventar } from '../../Secyrity/Inventarka/ModelSecurity/AuthInventory';

import { InventarModule } from '../Inventory/Inventory';
import { LkModule } from '../LkUser/Lk';
import { AuthLk } from '../../Secyrity/LKInventarka/ModelSecurityLK/AuthLK';

const appRoutes: Routes = [
    {
        path: 'Inventory',
        loadChildren: ()=> InventarModule,
        canLoad: [AuthInventar]
    },
    {
        path: 'LkUser',
        loadChildren: ()=> LkModule,
        canLoad: [AuthLk]
    }


];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
