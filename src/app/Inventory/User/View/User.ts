import { Component, OnInit, ViewChild } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import {MatPaginator, MatSort } from '@angular/material';
import { UserTableModel,OtdelTableModel } from '../../AddFullModel/ModelTable/TableModel';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [EditAndAdd]
}) as any)

export class User implements OnInit {

    constructor(public selectall: PostInventar,public editandadd:EditAndAdd) { }
    @ViewChild('users') paginator: MatPaginator;
    @ViewChild('otdels') paginatorotdels: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    user:UserTableModel = new UserTableModel(this.editandadd);
    otdel:OtdelTableModel = new OtdelTableModel(this.editandadd);
  
    public ngOnInit() {
        this.user.addtableModel(this.selectall.select,this.paginator,this.sort);
        this.otdel.addtableModel(this.selectall.select,this.paginatorotdels,null);
    }

    public actualUsers(){
        this.selectall.actualusersmodel().subscribe(model=>{
             alert(model);
        });
    }
}