import { Component, OnInit } from '@angular/core';
import { BroadcastEventListener } from 'ng2-signalr';
import { SelectAllParametrs, AuthIdentificationSignalR, PostInventar } from '../../../Post RequestService/PostRequest';
import { DynamicTableColumnModel, Table } from '../../AddFullModel/ModelTable/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { ModeleReturn } from '../../ModelInventory/InventoryModel';


@Component(({
    selector: 'descrepancies',
    templateUrl: '../Html/Descrepancies.html',
    styleUrls: ['../Html/Descrepancies.css'],
    providers: [SelectAllParametrs]
}) as any)
export class Descrepancies implements OnInit {

    constructor(public select: SelectAllParametrs, public SignalR: AuthIdentificationSignalR, public selectall: PostInventar,) { }

    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs;
    columns: Table = this.dinamicmodel.columnsComparableUser[this.dinamicmodel.mainselectComparableUser.indexcolumnmodel];

    //Подписка на статус процесса
    public subscribeStatusProcess: any = null;
    public statusProcessInfo: string = null;

    ngOnInit(): void {
        this.descrepanciesServer(null);
        this.subscribeServers();
    }

    descrepanciesServer(type: any) {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselectComparableUser.indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.columnsComparableUser[this.dinamicmodel.mainselectComparableUser.indexcolumnmodel]
        })
    }

    public subscribeServers() {
        this.subscribeStatusProcess = new BroadcastEventListener<string>('SubscribeStatusProcess');
        this.SignalR.conect.listen(this.subscribeStatusProcess);
        this.subscribeStatusProcess.subscribe((statusProcess: ModeleReturn<string>) => {
            this.statusProcessInfo = statusProcess.Message;
        });
    }

    ///Запуск процесса актуализации АКСИОК
    startProcessComparableUser() {
        this.select.startProcessInventory(7);
    }

    ///Выгрузка отчетов из БД
    public async getReportXlsx() {
        if (this.dinamicmodel.columnsComparableUser[this.dinamicmodel.mainselectComparableUser.indexcolumnmodel].Type === 'ComparableUserResult') {
            await this.selectall.downLoadReportFileXlsxSqlView(this.selecting.generateModelSelectExcelReport());
            return;
        }
        if (this.dinamicmodel.columnsComparableUser[this.dinamicmodel.mainselectComparableUser.indexcolumnmodel].Type === 'ModelComparableAllSystemInventory') {
            await this.selectall.downLoadReportFileSqlViewTechReport(this.selecting.generateModelSelectExcelReport());
            return;
        }
        else {
            await this.selectall.downLoadXlsxSql(this.selecting.generatecommand());
            return;
        }
    }

    public async analysisGroupActiveDirectory() {
        await this.select.addselectallparametrs(new ModelSelect(62)).subscribe((model: ModelSelect) => {
            this.selectall.downLoadXlsxSql(model.logicaSelectField)
        })
    }
}