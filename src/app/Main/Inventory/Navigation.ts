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
import { Synchronization } from '../../Inventory/Process/Synchronization/View/Synchronization';
import { Log } from '../../Inventory/JurnalLog/View/Log';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MailPop3 } from '../../Inventory/MailPop3/Mail/View/MailPop3';
import { UserMail } from '../../Inventory/MailPop3/UserMail/View/UserMail';

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
            component: DocumentSelect,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор','Оператор'],
               }
            }
        },
        {
            path: 'book',
            component: BookAccounting,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор','Оператор'],
               }
            }
        },
        {
            path:'analitics',
            component:Analitics,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор','Оператор'],
               }
            }
        },
        {
            path:'error',
            component:ErrorInventory,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор','Оператор'],
               }
            }
        },
        {
            path:'process',
            component:Synchronization,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор'],
               }
            }
        },
        {
            path:'log',
            component:Log,
            canActivate: [NgxPermissionsGuard],
            data: {
               permissions: {
               only: ['Администратор','Редактор'],
               }
            }
        },
        {
            path:'mail',
            component:MailPop3,
        },
        {
            path:'userandgroup',
            component:UserMail
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


