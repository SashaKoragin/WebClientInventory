import { Component, OnInit, ViewChild } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import { FullSelectedModel, Otdels } from '../../ModelInventory/InventoryModel';
import {MatPaginator, MatSort } from '@angular/material';
import { deserialize,plainToClass } from 'class-transformer';
import { UserTableModel } from '../../AddFullModel/ModelTable/TableModel';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [PostInventar,EditAndAdd]
}) as any)

export class User implements OnInit {

    constructor(public httpclient: PostInventar,public editandadd:EditAndAdd) { }
    @ViewChild('users') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    user:UserTableModel = new UserTableModel(this.editandadd)
    select: FullSelectedModel = new FullSelectedModel();
    ngOnInit(): void {
        
        this.httpclient.allotdel().subscribe((model)=>{
            if(model){
                this.select.Otdels = JSON.parse(model.toString());
            }
        })
        this.httpclient.allposition().subscribe((model)=>{
            if (model) {}
            this.select.Position = JSON.parse(model.toString());
        })
        this.httpclient.alluser().subscribe((model)=> {
            if (model) {
                
                this.select.Users = JSON.parse(model.toString());
                this.user.addtableModel(this.select,this.paginator,this.sort);
            }
        });
    }
}