import { LkUser } from '../../LKUser/Main/Model/MainLk';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthLk } from '../../Secyrity/LKInventarka/ModelSecurityLK/AuthLK';
import { NgxPermissionsGuard } from 'ngx-permissions';

const appRoutesLk: Routes = [
    {
        path: '',
        component: LkUser,
        canActivate: [AuthLk, NgxPermissionsGuard],
        data: {
            permissions: {
                only: ['Личный кабинет'],
                redirectTo:{
                    navigationCommands:['Error'],
                    navigationExtras:{
                        skipLocationChange:true
                    }
                }
            }
        },
    }];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutesLk)
    ],
    exports: [RouterModule]
})
export class AppRoutingModuleLkModule { }
