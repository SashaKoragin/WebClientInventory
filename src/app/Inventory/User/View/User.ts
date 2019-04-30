import { Component, OnInit, ViewChild } from '@angular/core';
import {PostInventar } from '../../../Post RequestService/PostRequest';
import { FullSelectedModel, AllUserSelected, Otdels } from '../../ModelInventory/InventoryModel';
import {MatPaginator } from '@angular/material';
import { deserialize,plainToClass } from 'class-transformer';
import { UserTableModel } from '../../AddFullModel/ModelTable/TableModel';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [PostInventar]
}) as any)

export class User implements OnInit {

    constructor(public httpclient: PostInventar) { }
    @ViewChild('users') paginator: MatPaginator;

    user:UserTableModel = new UserTableModel()
    select: FullSelectedModel = new FullSelectedModel();
    ngOnInit(): void {
        this.httpclient.allotdel().subscribe((model)=>{
            if(model){
                this.select.Otdels = JSON.parse(model.toString());
            }
        })
        this.httpclient.alluser(1).toPromise().then((model)=> {
            if (model) {
                this.select.AllUserSelected = deserialize(AllUserSelected, model.toString());
                this.user.addtableModel(this.select.AllUserSelected.Users,this.paginator);
            }
        });
    }
}