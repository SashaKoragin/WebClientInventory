import { Component, OnInit, ViewChild } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import {MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { UserTableModel,OtdelTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { UsersIsActualsStats } from '../../ModelInventory/InventoryModel';
import { strict } from 'assert';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [EditAndAdd]
}) as any)

export class User implements OnInit {

    constructor(public selectall: PostInventar,public editandadd:EditAndAdd) { }
    public serveranswer:string = null; //Ответ с сервера
    @ViewChild('users',{static: true}) paginator: MatPaginator;
    @ViewChild('otdels',{static: true}) paginatorotdels: MatPaginator;
    @ViewChild(MatSort,{static: true}) sort: MatSort;
    user:UserTableModel = new UserTableModel(this.editandadd);
    otdel:OtdelTableModel = new OtdelTableModel(this.editandadd);
  
    public displayedColumns = ['Id','ChangeType','IdUser','NameUsers','SmallNameUsers','IdOtdel','IdPosition','TabelNumber','StatusActual'];
    public dataSource: MatTableDataSource<UsersIsActualsStats> = new MatTableDataSource<UsersIsActualsStats>(this.selectall.select.UsersIsActualsStats);

    public ngOnInit() {
        this.loadsModel();
    }

    public async actualUsers(){
        this.serveranswer = 'Идет актулизация (подождите)!'
       await this.selectall.actualusersmodel().subscribe(async model=>{
            await this.selectall.fullusers();
            await this.loadsModel();
            this.serveranswer = model.toString();
        });
    }

   async loadsModel(){
    var message = null;  
    message =await this.user.addtableModel(this.selectall.select,this.paginator,this.sort);
    console.log(message);
    message = await this.otdel.addtableModel(this.selectall.select,this.paginatorotdels,null);
    console.log(message);    
    this.dataSource.data = this.selectall.select.UsersIsActualsStats;
    console.log(this.dataSource.data.length);
}
}