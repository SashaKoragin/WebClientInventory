import { Component, OnInit } from '@angular/core';
import {PostInventar } from '../../../Post RequestService/PostRequest';
import { AllSelected } from '../../ModelInventory/InventoryModel';
import { UserValidation } from '../../AddFullModel/ValidationModel/ValidateTableForm';
import { UserTableModel } from '../../AddFullModel/ModelTable/TableModel';
//import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { deserialize } from 'class-transformer';
@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [PostInventar, UserValidation]
}) as any)

export class User implements OnInit {

    constructor(public httpclient: PostInventar, public uservalid: UserValidation) { }

    user:UserTableModel = new UserTableModel();
    select: AllSelected = null;
    ngOnInit(): void {
        this.httpclient.alluser(1).subscribe((model)=> {
            if (model) {
                this.select = deserialize(AllSelected, model.toString());
                
                this.user.addtableModel(this.select.Users);
               // this.table = new Table<Users>(this.select.Users, this.model.modelusers);
               // this.name= new ModelColumns(this.table.models);
            }
        });

    }
}