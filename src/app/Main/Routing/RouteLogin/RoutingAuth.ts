import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './NgAuth';
import { AngularMaterialModule } from '../../MaterialLibary/MaterialLibary';
import { LoginInventarization } from '../../../Secyrity/Security/Security';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        AngularMaterialModule
    ],
    declarations: [
         LoginInventarization
    ]
})
export class AuthModule { }