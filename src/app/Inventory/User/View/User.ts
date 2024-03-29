import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR, AuthIdentification, SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { UserTableModel, TelephonsTableModel, OtdelTableModel, AddAndDeleteRuleUser } from '../../AddFullModel/ModelTable/TableModel';
import { UsersIsActualsStats, AllUsersFilters } from '../../ModelInventory/InventoryModel';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { ReportCardModel } from '../../AddFullModel/DialogReportCard/ReportCardModel/ReportCardModel';
import { ReportCard } from '../../AddFullModel/DialogReportCard/DialogReportCardTs/DialogReportCard';
import { DatePipe } from '@angular/common';
import { Template, ModelMemo } from '../../../LKUser/Main/Model/ReportMemo';


@Component(({
    selector: 'equepment',
    templateUrl: '../Html/User.html',
    styleUrls: ['../Html/User.css'],
    providers: [EditAndAdd, SelectAllParametrs, DatePipe]
}) as any)

export class User implements OnInit {

    constructor(public selectall: PostInventar,
        public editandadd: EditAndAdd,
        public SignalR: AuthIdentificationSignalR,
        private dp: DatePipe,
        public authService: AuthIdentification,
        public dialog: MatDialog,
        public select: SelectAllParametrs,) { }


    public templateServer: Template = new Template();
    public settingModel: ReportCardModel = null;
    @ViewChild('TEMPLATEUSERS', { static: true }) templateUsers: ElementRef;
    @ViewChild('TEMPLATEOTDELS', { static: true }) templateOtdels: ElementRef;
    @ViewChild('TEMPLATETELEPHONE', { static: true }) templateTelephone: ElementRef;

    isload: boolean = true;
    loadMessage: string[] = []
    public serveranswer: string = null; //Ответ с сервера
    @ViewChild('TABLEUSERS', { static: true }) tableusers: ElementRef;
    @ViewChild('TABLEOTDELS', { static: false }) tableotdels: ElementRef;
    @ViewChild('users', { static: true }) paginator: MatPaginator;
    @ViewChild('otdels', { static: true }) paginatorotdels: MatPaginator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;


    @ViewChild('telephones', { static: true }) paginatortelephones: MatPaginator;
    @ViewChild(MatSort, { static: true }) sorttelephones: MatSort;

    @ViewChild('TABLETELEPHONES', { static: false }) tabletelephones: ElementRef;

    ///Таблица роли и пользователи
    @ViewChild('TABLEMODELRULES', { static: false }) tableModelRule: ElementRef;
    @ViewChild(MatSort, { static: true }) sortroleAndUser: MatSort;

    @ViewChild('userRoles', { static: true }) paginatorRoles: MatPaginator;



    filterActual: AllUsersFilters = new AllUsersFilters();
    user: UserTableModel = new UserTableModel(this.editandadd, this.SignalR);
    otdel: OtdelTableModel = new OtdelTableModel(this.editandadd, this.SignalR);
    //Роли пользователя
    roleAndUser: AddAndDeleteRuleUser = new AddAndDeleteRuleUser(this.editandadd);

    excel: ImportToExcel = new ImportToExcel();
    public telephone: TelephonsTableModel = new TelephonsTableModel(this.editandadd, this.SignalR);



    ///Создание QR Code Model SerialNumber
    createQRCode(serialNumber: string, isAll: boolean) {
        if (serialNumber) {
            this.editandadd.createQRCode(serialNumber, isAll);
        }
        else {
            alert(`У оборудования отсутствует серийный номер - ${serialNumber}!`)
        }
    }

    datetemplate(date: any) {
        if (date) {
            if (date.length > 10) {
                return this.dp.transform(date, 'dd-MM-yyyy')
            }
        }
        return date;
    }

    public displayedColumns = ['Id', 'ChangeType', 'IdUser', 'NameUsers', 'SmallNameUsers', 'IdOtdel', 'IdPosition', 'TabelNumber', 'StatusActual'];
    public dataSource: MatTableDataSource<UsersIsActualsStats> = new MatTableDataSource<UsersIsActualsStats>(this.selectall.select.UsersIsActualsStats);

    ngOnInit(): void {
        this.loadsModel();
    }

    public async telephoneHelp() {
        this.serveranswer = 'Выгружаем справочник телефонов!!!'
        await this.selectall.telephonehelp(new ModelSelect(10))
    }

    public async getTelephoneFull() {
        await this.select.addselectallparametrs(new ModelSelect(23)).subscribe((model: ModelSelect) => {
            this.selectall.downLoadXlsxSql(model.logicaSelectField)
        })
    }

    public async actualUsers() {
        this.serveranswer = 'Идет актуализация (подождите)!'
        await this.selectall.actualusersmodel().subscribe(async model => {
            await this.selectall.fullusers();
            await this.loadsModel();
            this.serveranswer = model.toString();
        });
    }


    async loadsModel() {
        this.filterActual.filterActualField.isFilterField = true;
        var message = null;
        await this.selectall.allTemplate();
        await this.selectall.allrule();
        await this.selectall.alluser(this.filterActual);
        await this.selectall.allposition();
        await this.selectall.alltelephone();
        await this.selectall.allotdel();
        await this.selectall.settingCategoryPhoneHeader();
        message = await this.user.addtableModel(this.selectall.select, this.paginator, this.sort, this.tableusers, this.templateUsers);
        this.loadMessage.push(message);
        await this.selectall.allstatisticsusers();
        message = await this.otdel.addtableModel(this.selectall.select, this.paginatorotdels, null, this.tableotdels, this.templateOtdels);
        this.loadMessage.push(message);
        await this.selectall.allstatysing();
        await this.selectall.allkabinet();
        await this.selectall.allsupply();
        message = await this.telephone.addtableModel(this.selectall.select, this.paginatortelephones, this.sorttelephones, this.tabletelephones, this.templateTelephone);
        this.loadMessage.push(message);
        message = await this.roleAndUser.addtableModel(this.selectall.select, this.paginatorRoles, this.sortroleAndUser, this.tableModelRule);
        this.loadMessage.push(message);
        this.dataSource.data = this.selectall.select.UsersIsActualsStats;
        this.settingModel = new ReportCardModel(this.selectall.select.Otdels.filter(x => x.User !== undefined));
        this.isload = false;
    }


    createReportCard() {
        this.settingModel.settingParametersField.tabelNumberField = this.authService.autorization.tabelNumberField;
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
    createMemoReport(idUser: number, nameUser: string, modelMemo: ModelMemo, status: string, tabelNumber: string) {
        if (modelMemo.idNumberMemo == 3) {
            if (status !== "Работает") {
                alert(`Невозможно создать заявку типа ${modelMemo.nameMemo} на сотрудника со статусом ${status}`)
                return;
            }
        }
        this.editandadd.createMemoReport(nameUser, this.templateServer.createModelSend(idUser, tabelNumber, modelMemo))
    }

}