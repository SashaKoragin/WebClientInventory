import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import {MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { UserTableModel, OtdelTableModel, TelephonsTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { UsersIsActualsStats } from '../../ModelInventory/InventoryModel';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { TemplateUsers } from '../../TemplateTableEditors/Wiew/TemplateUser';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [EditAndAdd]
}) as any)

export class User implements OnInit {
    constructor(public selectall: PostInventar,public editandadd:EditAndAdd) { }



    @ViewChild('TEMPLATEUSERS',{static: true}) templateUsers: ElementRef;
    @ViewChild('TEMPLATEOTDELS',{static: true}) templateOtdels: ElementRef;
    @ViewChild('TEMPLATETELEPHONE',{static: true}) templateTelephone: ElementRef;
 
    isload:boolean = true;
    loadMessage:string[] = []
    public serveranswer:string = null; //Ответ с сервера
    @ViewChild('TABLEUSERS',{static: true}) tableusers: ElementRef;
    @ViewChild('TABLEOTDELS',{static: false}) tableotdels: ElementRef;
    @ViewChild('users',{static: true}) paginator: MatPaginator;
    @ViewChild('otdels',{static: true}) paginatorotdels: MatPaginator;
    @ViewChild(MatSort,{static: true}) sort: MatSort;
    
 
    @ViewChild('telephones',{static: true}) paginatortelephones: MatPaginator;
    @ViewChild(MatSort,{static: true}) sorttelephones: MatSort;

    @ViewChild('TABLETELEPHONES',{static: false}) tabletelephones: ElementRef;
    
    user:UserTableModel = new UserTableModel(this.editandadd);
    otdel:OtdelTableModel = new OtdelTableModel(this.editandadd);
    excel:ImportToExcel = new ImportToExcel();
    public telephone:TelephonsTableModel = new TelephonsTableModel(this.editandadd);

    dateconverters(date:any){
        if(date){
          var dateOut = new Date(date);
          return dateOut;
        }
        return null;
      }

    public displayedColumns = ['Id','ChangeType','IdUser','NameUsers','SmallNameUsers','IdOtdel','IdPosition','TabelNumber','StatusActual'];
    public dataSource: MatTableDataSource<UsersIsActualsStats> = new MatTableDataSource<UsersIsActualsStats>(this.selectall.select.UsersIsActualsStats);

    ngOnInit():void {
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
    await this.selectall.alluser();
    await this.selectall.allposition();
    await this.selectall.alltelephone();
    await this.selectall.allotdel();
    this.loadMessage.push(message);
    message =await this.user.addtableModel(this.selectall.select,this.paginator,this.sort,this.tableusers,this.templateUsers);
    this.loadMessage.push(message);
    await this.selectall.allstatisticsusers();
    message = await this.otdel.addtableModel(this.selectall.select,this.paginatorotdels,null,this.tableotdels,this.templateOtdels);
    this.loadMessage.push(message);  
    await this.selectall.allstatysing();
    await this.selectall.allkabinet();
    await this.selectall.allsupply(); 
    message = await this.telephone.addtableModel(this.selectall.select,this.paginatortelephones,this.sorttelephones,this.tabletelephones,this.templateTelephone);
    this.loadMessage.push(message);
    this.dataSource.data = this.selectall.select.UsersIsActualsStats;
    this.isload = false;
}
}