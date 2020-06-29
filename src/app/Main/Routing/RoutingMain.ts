import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthInventar } from '../../Secyrity/ModelSecurity/AuthInventory';

import { InventarModule } from '../Inventory/Inventory';

const appRoutes: Routes = [
    {
        path: 'Inventory',
        loadChildren: ()=> InventarModule,
        canLoad: [AuthInventar]
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
