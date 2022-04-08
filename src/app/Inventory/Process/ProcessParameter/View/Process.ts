import { EditAndAdd, PostInventar, AuthIdentification, AuthIdentificationSignalR } from '../../../../Post RequestService/PostRequest';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { ImportToExcel } from '../../../AddFullModel/ModelTable/PublicFunction';
import { EventProcessTableModel } from '../../../AddFullModel/ModelTable/TableModel';
import { MatPaginator } from '@angular/material/paginator';



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

    ///Шаблоны
    @ViewChild('TEMPLATEEVENTPROCESS', { static: true }) templateEventProcess: ElementRef;
    @ViewChild('eventProcesses', { static: true }) paginatorEventProcess: MatPaginator;
    @ViewChild(MatSort, { static: false }) sortEventProcess: MatSort;
    @ViewChild('TABLEEVENTPROCESS', { static: false }) tableEventProcess: ElementRef;

    isLoad: boolean = true;
    loadMessage: string[] = []
    excel: ImportToExcel = new ImportToExcel();

    public eventProcess: EventProcessTableModel = new EventProcessTableModel(this.editandadd, this.SignalR);

    public async ngOnInit(): Promise<void> {
        await this.start()
    }


    async start() {
        var message = null;
        this.isLoad = true;
        await this.selectAll.allEventProcess();
        message = await this.eventProcess.addtableModel(this.selectAll.select, this.paginatorEventProcess, this.sortEventProcess, this.tableEventProcess, this.templateEventProcess);;
        this.loadMessage.push(message);
        this.isLoad = false;
    }

}