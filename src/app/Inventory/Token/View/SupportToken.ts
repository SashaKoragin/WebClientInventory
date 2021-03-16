import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { PrinterTableModel, ScanerAndCamerTableModel, MfuTableModel, SysBlockTableModel, MonitorsTableModel, BlockPowerTableModel, SwitchTableModel, ServerEquipmentTableModel, TokenTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { DatePipe } from '@angular/common';



@Component(({
    selector: 'supportTokens',
    templateUrl: '../Html/Token.html',
    styleUrls: ['../Html/Token.css'],
    providers: [EditAndAdd, DatePipe]

}) as any)

export class SupportToken implements OnInit {

    constructor(
        public editandadd: EditAndAdd,
        public selectAll: PostInventar,
        private dp: DatePipe,
        public SignalR: AuthIdentificationSignalR,
        public authService: AuthIdentification,
        public dialog: MatDialog) { }


    datetemplate(date: any) {
        if (date) {
            if (date.length > 10) {
                return this.dp.transform(date, 'dd-MM-yyyy')
            }
        }
        return date;
    }

    @ViewChild('TEMPLATETOKEN', { static: true }) templateToken: ElementRef;
    @ViewChild('tokens', { static: true }) paginatorToken: MatPaginator;
    @ViewChild(MatSort, { static: true }) sortToken: MatSort;
    @ViewChild('TABLETOKEN', { static: false }) tableToken: ElementRef;

    isload: boolean = true;
    loadMessage: string[] = []
    excel: ImportToExcel = new ImportToExcel();


    public token: TokenTableModel = new TokenTableModel(this.editandadd, this.SignalR)

    public filterSysBlokToken(value: any) {
        if (value != null) {
            this.token.sysblock = this.selectAll.select.SysBlok.filter(x => x.IdUser === value.IdUser && new Array(undefined, null, 16).some(y => y === x.IdStatus))
        }
    }



    public async ngOnInit(): Promise<void> {
        await this.start()
    }

    async start() {
        var message = null;
        await this.sendserver();
        await this.selectAll.allToken();
        message = await this.token.addtableModel(this.selectAll.select, this.paginatorToken, this.sortToken, this.tableToken, this.templateToken)
        this.loadMessage.push(message);
        this.isload = false;
    }

    async sendserver() {
        await this.selectAll.allstatysing();
        await this.selectAll.allsupply();
        await this.selectAll.alluser();
        await this.selectAll.allsysblok();
    }

}