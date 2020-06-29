import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserTableModel, TelephonsTableModel, OtdelTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { UsersIsActualsStats } from '../../ModelInventory/InventoryModel';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';


@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [EditAndAdd]
}) as any)

export class User implements OnInit {

    constructor(public selectall: PostInventar,
        public editandadd:EditAndAdd,
        public SignalR:AuthIdentificationSignalR,
        public authService: AuthIdentification,
        public dialog: MatDialog) { }

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
    
    user:UserTableModel = new UserTableModel(this.editandadd,this.SignalR);
    otdel:OtdelTableModel = new OtdelTableModel(this.editandadd,this.SignalR);
    excel:ImportToExcel = new ImportToExcel();
    public telephone:TelephonsTableModel = new TelephonsTableModel(this.editandadd,this.SignalR);

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

    public async telephoneHelp(){
        this.serveranswer = 'Выгружаем справочник телефонов!!!'
        await this.selectall.telephonehelp(new ModelSelect(10)).subscribe(async model=>{
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "Телефонный справочник инспекции";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }

    public async getTelephoneFull(){
        await this.selectall.downLoadXlsxSql(23).subscribe(async model=>{
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "Все телефоны по пользователям";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
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
    await this.selectall.allTemplate();
    await this.selectall.allrule();
    await this.selectall.alluser();
    await this.selectall.allposition();
    await this.selectall.alltelephone();
    await this.selectall.allotdel();
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


