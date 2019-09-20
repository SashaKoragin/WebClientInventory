import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInventar } from '../../Inventory/Main/Main/MainInventory';
import { AuthInventar  } from '../../Secyrity/ModelSecurity/AuthInventory';
import { Equipment } from '../../Inventory/Equipment/View/Equepment';
import { Invent } from '../../Inventory/Invent/View/Invent';
import { User } from '../../Inventory/User/View/User';
import { DocumentSelect } from '../../Inventory/Documents/Documents/View/DocumentsSelect';
import { ErrorInventory } from '../../Inventory/ErrorInventory/View/ErrorInventory';
import { ComplimentTableEquipment } from '../../Inventory/ComplimentTableEquipment/View/ComplimentTableEquipment';
import { Analitics } from '../../Inventory/Analitics/View/Analitics';
import { BookAccounting } from '../../Inventory/Documents/BookAccounting/View/BookAccounting';

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
            path: 'techicalComplement',
            component: ComplimentTableEquipment
        },
        {
            path: 'inventar',
            component: Invent
        },
        {
            path: 'users',
            component: User
        },
        {
            path: 'documents',
            component: DocumentSelect
        },
        {
            path: 'book',
            component: BookAccounting
        },
        {
            path:'analitics',
            component:Analitics
        },
        {
            path:'error',
            component:ErrorInventory
        }
    ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }


