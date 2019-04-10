import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInventarization } from '../../../Secyrity/Security/Security';


const authRoutes: Routes = [

    {
        path: 'InventoryLogin',
        component: LoginInventarization
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
