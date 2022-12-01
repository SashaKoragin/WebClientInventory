import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInventar } from '../../Inventory/Main/Main/MainInventory';
import { AuthInventar } from '../../Secyrity/Inventarka/ModelSecurity/AuthInventory';
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
import { SupportToken } from '../../Inventory/Token/View/SupportToken';
import { TemplatendRuleAis3 } from '../../Inventory/Ais3/TemplatendRuleAis3/View/TemplatendRuleAis3';
import { PathAis3 } from '../../Inventory/Ais3/PathAis3/View/PathAis3';
import { SettingInventory } from '../../Inventory/SettingInventory/View/SettingInventory';
import { JournalAis3 } from '../../Inventory/Ais3/JournalAis3/View/JournalAis3';
import { EquipmentSto } from '../../Inventory/EquipmentSto/View/EquipmentSto';
import { ModelProcess } from '../../Inventory/Process/ProcessParameter/View/Process';
import { AksiokDirectory } from '../../Inventory/AksiokSupport/AcsiokDirectory/View/AcsiokDirectory';
import { Aksiok } from '../../Inventory/AksiokSupport/Aksiok/View/Aksiok';
import { Descrepancies } from '../../Inventory/Descrepancies/View/Descrepancies';
import { FileServer } from '../../Inventory/FileServer/View/FileServer';

const appRoutes: Routes = [
    {
        path: '',
        component: MainInventar,
        canActivate: [AuthInventar, NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['Администратор', 'Редактор', 'Оператор', 'Просмотр', 'Безопасность'],
                redirectTo: {
                    navigationCommands: ['Error'],
                    navigationExtras: {
                        skipLocationChange: true
                    }
                }
            }
        },
        children: [
            {
                path: 'setting',
                component: SettingInventory,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор'],
                    }
                }

            },
            {
                path: 'journalAis3',
                component: JournalAis3,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор'],
                    }
                }
            },
            {
                path: 'techical',
                component: Equipment
            },
            {
                path: 'equipmentSto',
                component: EquipmentSto
            },
            {
                path: 'aksiokDirectory',
                component: AksiokDirectory
            },
            {
                path: 'aksiok',
                component: Aksiok
            },
            {
                path: 'techicalComplement',
                component: ComplimentTableEquipment
            },
            {
                path: 'supportToken',
                component: SupportToken
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
                path: 'Descrepancies',
                component: Descrepancies
            },
            {
                path: 'FileServer',
                component: FileServer
            },
            {
                path: 'pathAis3',
                component: PathAis3,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Безопасность'],
                    }
                }
            },
            {
                path: 'templatendRuleAis3',
                component: TemplatendRuleAis3,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Безопасность'],
                    }
                }
            },
            {
                path: 'documents',
                component: DocumentSelect,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор', 'Оператор'],
                    }
                }
            },
            {
                path: 'book',
                component: BookAccounting,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор', 'Оператор'],
                    }
                }
            },
            {
                path: 'analitics',
                component: Analitics,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор', 'Оператор'],
                    }
                }
            },
            {
                path: 'error',
                component: ErrorInventory,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор', 'Оператор'],
                    }
                }
            },
            {
                path: 'process',
                component: ModelProcess,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор'],
                    }
                }
            },
            {
                path: 'synchronization',
                component: Synchronization,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор'],
                    }
                }
            },
            {
                path: 'log',
                component: Log,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор', 'Редактор'],
                    }
                }
            },
            {
                path: 'mail',
                component: MailPop3,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор'],
                    }
                }
            },
            {
                path: 'userandgroup',
                component: UserMail,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['Администратор'],
                    }
                }
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


