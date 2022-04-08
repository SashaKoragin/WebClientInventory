import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectAllParametrs, AuthIdentificationSignalR, PostInventar, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs, LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../AddFullModel/ModelTable/DynamicTableModel';
import { BroadcastEventListener } from 'ng2-signalr';
import { Select } from '../../AddFullModel/ModelViewSelect/View/SelectView';
import { ModeleReturn } from '../../ModelInventory/InventoryModel';
import { ReportEpo } from '../../AddFullModel/DialogReportEpo/DialogReportEpoTs/DialogReportEpo';

@Component(({
    selector: 'equipmentSto',
    templateUrl: '../Html/EquipmentSto.html',
    styleUrls: ['../Html/EquipmentSto.css'],
    providers: [SelectAllParametrs]

}) as any)

export class EquipmentSto implements OnInit {
    constructor(public select: SelectAllParametrs,
        public selectall: PostInventar,
        public SignalR: AuthIdentificationSignalR,
        public dialog: MatDialog,
        public authService: AuthIdentification) { }


    @ViewChild('Sto', { static: false }) selectionChildSto: Select;
    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs;
    columns: Table = this.dinamicmodel.equipmentStoAll[0];

    //Подписка на статус процесса
    public subscribeStatusProcess: any = null;
    public statusProcessInfo: string = null;
    public blokingButtonReport: boolean = false;

    ngOnInit(): void {
        this.errorserver();
        this.subscribeservers();
    }

    errorserver() {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainEquipmentSto[0].indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
        })
    }

    public subscribeservers() {
        this.subscribeStatusProcess = new BroadcastEventListener<string>('SubscribeStatusProcess');
        this.SignalR.conect.listen(this.subscribeStatusProcess);
        this.subscribeStatusProcess.subscribe((statusProcess: ModeleReturn<string>) => {
            this.statusProcessInfo = statusProcess.Message;
            if (statusProcess.Index === 3) {
                this.blokingButtonReport = false;
                this.selectionChildSto.updateProcedure();
            }
            else {
                this.blokingButtonReport = true;
            }
        });
    }
    ///Выгрузка ЭПО 
    public async getAllEpo() {
        await this.selectall.downLoadXlsxSql(this.selecting.generatecommand())
    }

    ///Актулизация ЭПО
    public actualization() {
        this.select.startProcessUpdateSto();
    }

    public openDialogReportEpo() {
        const dialogRef = this.dialog.open(ReportEpo, {
            width: "1000px",
            height: "600px",
            data: this.authService
        })

    }
}
