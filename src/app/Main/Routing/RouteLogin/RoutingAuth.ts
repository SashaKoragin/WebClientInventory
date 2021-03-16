import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './NgAuth';
import { AngularMaterialModule } from '../../MaterialLibary/MaterialLibary';
import { LoginInventarization } from '../../../Secyrity/Inventarka/Security/Security';
import { LoginLk } from '../../../Secyrity/LKInventarka/Security/SecurityLk';
import { ErrorRules } from '../../../Secyrity/ErrorRule/ViewError/ErrorRule';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        AngularMaterialModule
    ],
    declarations: [
         LoginInventarization,LoginLk,ErrorRules
    ]
})
export class AuthModule { }