import { EditAndAdd, PostInventar, AuthIdentification, AuthIdentificationSignalR } from '../../../../Post RequestService/PostRequest';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { ImportToExcel } from '../../../AddFullModel/ModelTable/PublicFunction';
import { EventProcessTableModel, ParameterEventProcessTableModel } from '../../../AddFullModel/ModelTable/TableModel';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { EventProcess } from '../../../ModelInventory/InventoryModel';



@Component(({
    selector: 'process',
    templateUrl: '../Html/Process.html',
    styleUrls: ['../Html/Process.css'],
    providers: [EditAndAdd]

}) as any)

export class ModelProcess implements OnInit {

    constructor(
        public editandadd: EditAndAdd,
        public selectAll: PostInventar,
        public SignalR: AuthIdentificationSignalR,
        public authService: AuthIdentification,
        public dialog: MatDialog) { }

    selectionEventProcess = new SelectionModel<EventProcess>(false, []);
    isVisibleParameters: boolean = false;

    ///Шаблоны
    @ViewChild('TEMPLATEEVENTPROCESS', { static: true }) templateEventProcess: ElementRef;
    @ViewChild('eventProcesses', { static: true }) paginatorEventProcess: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortEventProcess: MatSort;
    @ViewChild('TABLEEVENTPROCESS', { static: false }) tableEventProcess: ElementRef;

    ///Шаблоны выбора параметров
    @ViewChild('TEMPLATEPARAMETEREVENTPROCESS', { static: true }) templateParameterEventProcess: ElementRef;
    @ViewChild('eventParameterEventProcess', { static: true }) paginatorEventParameterEventProcess: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortParameterEventProcess: MatSort;
    @ViewChild('TABLEPARAMETEREVENTPROCESS', { static: false }) tableParameterEventProcess: ElementRef;


    @ViewChild('TEMPLATEPARAMETEREVENTPROCESSALL', { static: true }) templateParameterEventProcessAll: ElementRef;
    @ViewChild('eventParameterEventProcessAll', { static: true }) paginatorEventParameterEventProcessAll: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortParameterEventProcessAll: MatSort;
    @ViewChild('TABLEPARAMETEREVENTPROCESSALL', { static: false }) tableParameterEventProcessAll: ElementRef;



    isLoad: boolean = true;
    loadMessage: string[] = []
    excel: ImportToExcel = new ImportToExcel();

    public eventProcess: EventProcessTableModel = new EventProcessTableModel(this.editandadd, this.SignalR);
    public parameterEventProcessTableModel: ParameterEventProcessTableModel = new ParameterEventProcessTableModel(this.editandadd, this.SignalR);

    public parameterEventProcessTableModelAll: ParameterEventProcessTableModel = new ParameterEventProcessTableModel(this.editandadd, this.SignalR);

    public async ngOnInit(): Promise<void> {
        this.loadMessage = [];
        await this.start();
        this.selectionEventProcess.clear();
        this.isVisibleParameters = false;
    }


    async start() {
        var message = null;
        this.isLoad = true;
        await this.selectAll.allDayOfTheWeekProcess();
        await this.selectAll.allEventProcess();
        message = await this.eventProcess.addtableModel(this.selectAll.select, this.paginatorEventProcess, this.sortEventProcess, this.tableEventProcess, this.templateEventProcess);
        this.loadMessage.push(message);
        await this.selectAll.allParametersProcess(0)
        message =await this.parameterEventProcessTableModelAll.addtableModel(this.selectAll.select, this.paginatorEventParameterEventProcessAll, this.sortParameterEventProcessAll, this.tableParameterEventProcessAll, this.templateParameterEventProcessAll);
        this.loadMessage.push(message);
        this.isLoad = false;
    }

    public async selectProcessParametersStart() {
        if (this.parameterEventProcessTableModel.isEdit) {
            this.parameterEventProcessTableModel.cancel(this.parameterEventProcessTableModel.modelCancelError);
        }
        if (this.selectionEventProcess.selected.length === 1) {
            await this.selectAll.allParametersProcess(this.selectionEventProcess.selected[0].IdProcess);
            await this.parameterEventProcessTableModel.addtableModel(this.selectAll.select, this.paginatorEventParameterEventProcess, this.sortParameterEventProcess, this.tableParameterEventProcess, this.templateParameterEventProcess);
            this.isVisibleParameters = true;
        }
        else {
            this.isVisibleParameters = false;
        }
    }
}