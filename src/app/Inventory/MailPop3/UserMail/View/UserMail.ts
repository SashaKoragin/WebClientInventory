import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR } from '../../../../Post RequestService/PostRequest';
import { ImportToExcel } from '../../../AddFullModel/ModelTable/PublicFunction';

import { DatePipe } from '@angular/common';
import { MatPaginator, MatSort } from '@angular/material';
import { MailIdentifiersTableModel, MailGroupTableModel } from '../../../AddFullModel/ModelTable/TableModel';

@Component(({
    selector: 'userandGroup',
    templateUrl: '../Html/UserMail.html',
    styleUrls: ['../Html/UserMail.css'],
    providers: [EditAndAdd,DatePipe]

}) as any)

export class UserMail implements OnInit {

    constructor(public editandadd:EditAndAdd,public selectAll:PostInventar,private dp: DatePipe,public SignalR:AuthIdentificationSignalR) { }



    ///Шаблоны
    @ViewChild('TEMPLATEMAILIDENTIFIER',{static: true}) templateMailIdentifier: ElementRef;
    @ViewChild('TEMPLATEMAILGROUP',{static: true}) templateMailGroup: ElementRef;

    isload:boolean = true;
    loadMessage:string[] = []
    @ViewChild('identifiers',{static: true}) paginatoridentifier: MatPaginator;
    @ViewChild(MatSort,{static: false}) sortidentifiers: MatSort;
    @ViewChild('mailgroups',{static: true}) paginatormailgroup: MatPaginator;
    @ViewChild(MatSort,{static: false}) sortmailgroup: MatSort;

    excel:ImportToExcel = new ImportToExcel();

    @ViewChild('TABLEMAILIDENTIFIER',{static: false}) tableMailIdentifier: ElementRef;
    @ViewChild('TABLEMAILGROUP',{static: false}) tableMailGroup: ElementRef;

    public identifier: MailIdentifiersTableModel = new MailIdentifiersTableModel(this.editandadd,this.SignalR);  
    public mailgroup: MailGroupTableModel = new MailGroupTableModel(this.editandadd,this.SignalR);  

    public async ngOnInit():Promise<void> {
     this.sendserver();
    }


    async sendserver(){
        var message = null;  
        await this.selectAll.allmailgroup();
        message = await this.mailgroup.addtableModel(this.selectAll.select,this.paginatormailgroup,this.sortmailgroup,this.tableMailGroup,this.templateMailGroup);;
        this.loadMessage.push(message);
        await this.selectAll.allmailidentifies();
        message = await this.identifier.addtableModel(this.selectAll.select,this.paginatoridentifier,this.sortidentifiers,this.tableMailIdentifier,this.templateMailIdentifier);;
        this.loadMessage.push(message);
        this.isload = false;
    }

}