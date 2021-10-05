import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditAndAdd, PostInventar, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AllTechnicsLkModel, UserTableModel } from '../../../Inventory/AddFullModel/ModelTable/TableModel';
import { ImportToExcel } from '../../../Inventory/AddFullModel/ModelTable/PublicFunction';
import { ModelSelect } from '../../../Inventory/AllSelectModel/ParametrModel';
import { ReportCardModel } from '../../../Inventory/AddFullModel/DialogReportCard/ReportCardModel/ReportCardModel';
import { ReportCard } from '../../../Inventory/AddFullModel/DialogReportCard/DialogReportCardTs/DialogReportCard';
import { Template, ModelMemo } from './ReportMemo';


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

    public settingModel: ReportCardModel = null;
    public templateServer: Template = new Template();
    isload: boolean = true;
    loadMessage: string[] = []

    ///Шаблоны
    @ViewChild('TEMPLATEALLTECHNIC', { static: true }) templateAllTechnic: ElementRef;
    @ViewChild('TEMPLATEUSERSDEPT', { static: true }) templateUsers: ElementRef;
    ///Сортировка пагинатор
    @ViewChild('alltechnics', { static: true }) paginatoralltechnic: MatPaginator;
    @ViewChild('usersdept', { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortalltechnic: MatSort;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    ///Таблица
    @ViewChild('TABLEALLTECHNICS', { static: false }) tablealltechnic: ElementRef;
    @ViewChild('TABLEUSERSDEPT', { static: true }) tableusers: ElementRef;

    public alltechnic: AllTechnicsLkModel = new AllTechnicsLkModel(this.editandadd)
    public user: UserTableModel = new UserTableModel(this.editandadd, null);






    public excel: ImportToExcel = new ImportToExcel();

    public async ngOnInit(): Promise<void> {
        await this.start()
    }

    async start() {
        var message = null;
        await this.sendserver();
        await this.selectAll.allTechnics(this.authService.autorizationLk.idUserField);
        await this.selectAll.allUsersDepartmentLk(this.authService.autorizationLk.idUserField);
        await this.selectAll.allposition();
        await this.selectAll.alltelephone();
        await this.selectAll.allotdel();
        message = await this.alltechnic.addtableModel(this.selectAll.select, this.paginatoralltechnic, this.sortalltechnic, this.tablealltechnic, this.templateAllTechnic)
        this.loadMessage.push(message);
        message = await this.user.addtableModel(this.selectAll.select, this.paginator, this.sort, this.tableusers, this.templateUsers);
        this.loadMessage.push(message);
        this.settingModel = new ReportCardModel(this.selectAll.select.Otdels.filter(x => x.User !== undefined));
        this.isload = false;
    }

    ///Телефонный справочник
    public async telephoneHelp() {
        await this.selectAll.telephonehelp(new ModelSelect(10))
    }

    ///Создание табелей
    createReportCard() {
        this.settingModel.settingParametersField.tabelNumberField = this.authService.autorizationLk.tabelNumberField;
        const dialogRef = this.dialog.open(ReportCard, {
            width: "800px",
            height: "500px",
            data: this.settingModel
        })
        dialogRef.afterClosed().subscribe(() => {
            console.log("Вышли из диалога!");
        });
    }

    ///Создание служебных записок для отдела информатизации
    createMemoReport(idUser: number, nameUser: string, modelMemo: ModelMemo) {
        this.editandadd.createMemoReport(nameUser, this.templateServer.createModelSend(idUser, this.authService.autorizationLk.tabelNumberField, modelMemo))
    }

    //Загрузка шаблонов 
    async sendserver() {
        await this.selectAll.allTemplate();
    }
}