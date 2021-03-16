import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditAndAdd, PostInventar, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AllTechnicsLkModel } from '../../../Inventory/AddFullModel/ModelTable/TableModel';
import { ImportToExcel } from '../../../Inventory/AddFullModel/ModelTable/PublicFunction';
import { ModelSelect } from '../../../Inventory/AllSelectModel/ParametrModel';


@Component(({
    templateUrl: '../Html/MainLk.html',
    styleUrls: ['../Html/MainLk.css'],
    providers: [EditAndAdd]
}) as any)
export class LkUser implements OnInit {

    constructor(public editandadd: EditAndAdd,
        public selectAll: PostInventar,
        public authService: AuthIdentification,
        public dialog: MatDialog) { }

    isload: boolean = true;
    loadMessage: string[] = []

    ///Шаблоны
    @ViewChild('TEMPLATEALLTECHNIC', { static: true }) templateAllTechnic: ElementRef;
    ///Сортировка пагинатор
    @ViewChild('alltechnics', { static: true }) paginatoralltechnic: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortalltechnic: MatSort;
    ///Таблица
    @ViewChild('TABLEALLTECHNICS', { static: false }) tablealltechnic: ElementRef;

    public alltechnic: AllTechnicsLkModel = new AllTechnicsLkModel(this.editandadd)

    public excel: ImportToExcel = new ImportToExcel();

    public async ngOnInit(): Promise<void> {
        await this.start()
    }

    async start() {
        var message = null;
        await this.sendserver();
        await this.selectAll.allTechnics(this.authService.autorizationLk.idUserField);
        console.log(this.selectAll.select.AllTechnics);
        message = await this.alltechnic.addtableModel(this.selectAll.select, this.paginatoralltechnic, this.sortalltechnic, this.tablealltechnic, this.templateAllTechnic)
        this.loadMessage.push(message);
        this.isload = false;
    }

    ///Телефонный справочник
    public async telephoneHelp() {
        await this.selectAll.telephonehelp(new ModelSelect(10))
    }


    //Загрузка шаблонов 
    async sendserver() {
        await this.selectAll.allTemplate();
    }
}