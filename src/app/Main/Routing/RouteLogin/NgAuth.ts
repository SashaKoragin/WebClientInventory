import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInventarization } from '../../../Secyrity/Inventarka/Security/Security';
import { LoginLk } from '../../../Secyrity/LKInventarka/Security/SecurityLk';
import { ErrorRules } from '../../../Secyrity/ErrorRule/ViewError/ErrorRule';


const authRoutes: Routes = [

    {
        path: 'InventoryLogin',
        component: LoginInventarization
    },
    {
        path: 'LkUserLogin',
        component: LoginLk
    },
    {  
        path: 'Error',
        component: ErrorRules
     },
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
