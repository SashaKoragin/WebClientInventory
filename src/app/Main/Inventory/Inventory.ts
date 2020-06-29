import { NgModule } from '@angular/core';
import { AppRoutingModule } from './Navigation';
import { MainInventar, FilterParametrs } from '../../Inventory/Main/Main/MainInventory';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { ReactiveFormsModule } from '@angular/forms';
import { Equipment } from '../../Inventory/Equipment/View/Equepment';
import { Invent } from '../../Inventory/Invent/View/Invent';
import { User } from '../../Inventory/User/View/User';
import { FormsModule } from '@angular/forms';
import { DocumentSelect } from '../../Inventory/Documents/Documents/View/DocumentsSelect';
import { ErrorInventory } from '../../Inventory/ErrorInventory/View/ErrorInventory';
import { Select } from '../../Inventory/AddFullModel/ModelViewSelect/View/SelectView';
import { ComplimentTableEquipment } from '../../Inventory/ComplimentTableEquipment/View/ComplimentTableEquipment';
import { MccColorPickerModule } from 'material-community-components';
import { Analitics } from '../../Inventory/Analitics/View/Analitics';
import { BookAccounting } from '../../Inventory/Documents/BookAccounting/View/BookAccounting';
import { UploadsFile } from '../../Inventory/AddFullModel/ModelLoadFileToServet/View/Upload';
import { Synchronization } from '../../Inventory/Process/Synchronization/View/Synchronization';
import { Log } from '../../Inventory/JurnalLog/View/Log';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MailPop3 } from '../../Inventory/MailPop3/Mail/View/MailPop3';
import { UserMail } from '../../Inventory/MailPop3/UserMail/View/UserMail';
import { DialogDiscription } from '../../Inventory/AddFullModel/ModelDialogDiscription/View/DialogDiscription';


@NgModule(({
    imports: [
        FormsModule,
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        NgxPermissionsModule,
        AppRoutingModule,
        MccColorPickerModule.forRoot({
            empty_color: 'transparent',
            used_colors: ['#000000', '#FFF555']
        }),
    ],
    entryComponents:[DialogDiscription],
    declarations: [
         MainInventar, MailPop3, UserMail, Equipment, Invent, 
         User, DocumentSelect, ErrorInventory,
          Select, UploadsFile,
          ComplimentTableEquipment, Analitics, FilterParametrs,
          BookAccounting, Synchronization, Log, DialogDiscription
    ]

}) as any)

export class InventarModule {



 }