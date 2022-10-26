import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { TokenTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { DatePipe } from '@angular/common';
import { AllUsersFilters } from '../../ModelInventory/InventoryModel';



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
        var allUsersFilters = new AllUsersFilters()
        allUsersFilters.filterActualField.isFilterField = true;
        await this.selectAll.allstatysing();
        await this.selectAll.allsupply();
        await this.selectAll.alluser(allUsersFilters);
        await this.selectAll.allsysblok();
    }
}