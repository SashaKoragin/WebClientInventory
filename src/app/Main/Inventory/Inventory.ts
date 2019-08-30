import { NgModule } from '@angular/core';
import { AppRoutingModule } from './Navigation';
import { MainInventar } from '../../Inventory/Main/Main/MainInventory';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../MaterialLibary/MaterialLibary';
import { ReactiveFormsModule } from '@angular/forms';
import { Equipment } from '../../Inventory/Equipment/View/Equepment';
import { Invent } from '../../Inventory/Invent/View/Invent';
import { User } from '../../Inventory/User/View/User';
import { FormsModule } from '@angular/forms';
import { DocumentSelect } from '../../Inventory/Documents/View/DocumentsSelect';
import { ErrorInventory } from '../../Inventory/ErrorInventory/View/ErrorInventory';
import { Select } from '../../Inventory/AddFullModel/ModelViewSelect/View/SelectView';
import { ComplimentTableEquipment } from '../../Inventory/ComplimentTableEquipment/View/ComplimentTableEquipment';
import { MccColorPickerModule} from 'material-community-components';
import { Analitics } from '../../Inventory/Analitics/View/Analitics';

@NgModule(({
    imports: [
        FormsModule,
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MccColorPickerModule.forRoot({
            empty_color: 'transparent',
            used_colors: ['#000000', '#FFF555']
          }),
    ],
    declarations: [
        MainInventar, Equipment, Invent, User,DocumentSelect,ErrorInventory,Select,ComplimentTableEquipment,Analitics
    ]
}) as any)

export class InventarModule { }