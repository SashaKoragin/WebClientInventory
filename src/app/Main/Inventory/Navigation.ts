import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInventar } from '../../Inventory/Main/Main/MainInventory';
import { AuthInventar  } from '../../Secyrity/ModelSecurity/AuthInventory';
import { Equipment } from '../../Inventory/Equipment/View/Equepment';
import { Invent } from '../../Inventory/Invent/View/Invent';
import { User } from '../../Inventory/User/View/User';
const appRoutes: Routes = [
{
    path: '',
    component: MainInventar,
    canActivate: [AuthInventar],
    children: [
        {
            path: 'techical',
            component: Equipment
        },
        {
            path: 'inventar',
            component: Invent
        },
        {
            path: 'users',
            component: User
        }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }


