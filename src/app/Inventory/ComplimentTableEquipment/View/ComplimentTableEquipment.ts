import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR } from '../../../Post RequestService/PostRequest';
import { NameSysBlockTableModel,NameModelSwitheTableModel, NameMonitorTableModel, NameModelBlokPowerTableModel, NameProizvoditelBlockPowerTableModel, NameFullModelTableModel, NameFullProizvoditelTableModel, NameClassificationTableModel, NameCopySaveTableModel, NameSupplyTableModel, NameKabinetTableModel, NameStatusingTableModel } from '../../AddFullModel/ModelTable/TableModel';
import {MatPaginator} from '@angular/material';
@Component(({
    selector: 'complimentTableEquipment',
    templateUrl: '../Html/ComplimentTableEquipment.html',
    styleUrls: ['../Html/ComplimentTableEquipment.css'],
    providers: [EditAndAdd]
}) as any)

export class ComplimentTableEquipment implements OnInit{
    constructor(public editandadd:EditAndAdd,public selectAll:PostInventar,public SignalR:AuthIdentificationSignalR) { }

   //Шаблоны
   @ViewChild('TEMPLATEMODELSYSBLOCK',{static: true}) templateModelSysBlock: ElementRef;
   @ViewChild('TEMPLATEMODELMONITOR',{static: false}) templateModelMonitor: ElementRef;
   @ViewChild('TEMPLATEMODELIBP',{static: false}) templateModelIbp: ElementRef;
   @ViewChild('TEMPLATEPROIZVODITELIBP',{static: false}) templateProizvoditelIbp: ElementRef;
   @ViewChild('TEMPLATECLASSIFICATIONMFU',{static: false}) templateClassificationMfu: ElementRef;
   @ViewChild('TEMPLATEMODELMFU',{static: false}) templateModelMfu: ElementRef;
   @ViewChild('TEMPLATEPROIZVODITELMFU',{static: false}) templateProizvoditelMfu: ElementRef;
   @ViewChild('TEMPLATECOPYSAVE',{static: false}) templateCopySave: ElementRef;
   @ViewChild('TEMPLATEKABINET',{static: false}) templateKabinet: ElementRef;
   @ViewChild('TEMPLATESTATUS',{static: false}) templateStatus: ElementRef;
   @ViewChild('TEMPLATESUPPLE',{static: false}) templateSupple: ElementRef;
   @ViewChild('TEMPLATESWITHE',{static: false}) templateSwithe: ElementRef;

   //Таблицы
   @ViewChild('TABLEMODELSYSBLOCK',{static: false}) tableModelSysBlock: ElementRef;
   @ViewChild('TABLEMODELMONITOR',{static: false}) tableModelMonitor: ElementRef;
   @ViewChild('TABLEPROIZVODITELIBP',{static: false}) tableProizvoditelIbp: ElementRef;
   @ViewChild('TABLEMODELIBP',{static: false}) tableModelIbp: ElementRef;
   @ViewChild('TABLECLASSIFICATIONMFU',{static: false}) tableClassificationMfu: ElementRef;
   @ViewChild('TABLEMODELMFU',{static: false}) tableModelMfu: ElementRef;
   @ViewChild('TABLEPROIZVODITELMFU',{static: false}) tableProizvoditelMfu: ElementRef;
   @ViewChild('TABLECOPYSAVE',{static: false}) tableCopySave: ElementRef;
   @ViewChild('TABLEKABINET',{static: false}) tableKabinet: ElementRef;
   @ViewChild('TABLESTATUS',{static: false}) tableStatus: ElementRef;
   @ViewChild('TABLESUPPLE',{static: false}) tableSupple: ElementRef;
   @ViewChild('TABLESWITHE',{static: false}) tableSwithe: ElementRef;

    isload:boolean = true;
    loadMessage:string[] = []
    @ViewChild('nameMonitors',{static: false}) paginatornameMonitors: MatPaginator;
    @ViewChild('nameSysBlocks',{static: false}) paginatornameSysBlocks: MatPaginator;
    @ViewChild('nameModelBlokPowers',{static: false}) paginatornameModelBlokPowers: MatPaginator;
    @ViewChild('nameProizvoditelBlocks',{static: false}) paginatornameProizvoditelBlocks: MatPaginator;
    @ViewChild('nameFullModels',{static: false}) paginatornameFullModels: MatPaginator;
    @ViewChild('nameFullProizvoditels',{static: false}) paginatornameFullProizvoditels: MatPaginator;
    @ViewChild('nameClassifications',{static: false}) paginatornameClassifications: MatPaginator;
    @ViewChild('nameCopySaves',{static: false}) paginatornameCopySaves: MatPaginator;
    @ViewChild('nameKabinets',{static: false}) paginatornameKabinets: MatPaginator;
    @ViewChild('nameSupplys',{static: false}) paginatornameSupplys: MatPaginator;
    @ViewChild('nameStatusings',{static: false}) paginatornameStatusings: MatPaginator;
    @ViewChild('nameModelSwithes',{static: false}) paginatornameModelSwithe: MatPaginator;

    public nameSysBlock: NameSysBlockTableModel = new NameSysBlockTableModel(this.editandadd,this.SignalR);
    public nameMonitor: NameMonitorTableModel = new NameMonitorTableModel(this.editandadd,this.SignalR);
    public nameModelBlokPower: NameModelBlokPowerTableModel = new NameModelBlokPowerTableModel(this.editandadd,this.SignalR)
    public nameProizvoditelBlock: NameProizvoditelBlockPowerTableModel = new NameProizvoditelBlockPowerTableModel(this.editandadd,this.SignalR) 
    public nameFullModel:NameFullModelTableModel = new NameFullModelTableModel(this.editandadd,this.SignalR)
    public nameFullProizvoditel:NameFullProizvoditelTableModel = new NameFullProizvoditelTableModel(this.editandadd,this.SignalR)
    public nameClassification:NameClassificationTableModel = new NameClassificationTableModel(this.editandadd,this.SignalR)
    public nameCopySave:NameCopySaveTableModel = new NameCopySaveTableModel(this.editandadd,this.SignalR)
    public nameKabinet: NameKabinetTableModel = new NameKabinetTableModel(this.editandadd,this.SignalR);
    public nameSupply:NameSupplyTableModel = new NameSupplyTableModel(this.editandadd,this.SignalR);
    public nameStatusing: NameStatusingTableModel = new NameStatusingTableModel(this.editandadd,this.SignalR);
    public nameModelSwithe: NameModelSwitheTableModel = new NameModelSwitheTableModel(this.editandadd,this.SignalR);

    ngOnInit(): void {
        this.start()   
    }

    async start(){
        var message = null;  
        await this.sendserver();
        message = await this.nameSysBlock.addtableModel(this.selectAll.select,this.paginatornameSysBlocks,null,this.tableModelSysBlock,this.templateModelSysBlock);
        this.loadMessage.push(message);
        message = await this.nameMonitor.addtableModel(this.selectAll.select,this.paginatornameMonitors,null,this.tableModelMonitor,this.templateModelMonitor);
        this.loadMessage.push(message);
        message = await this.nameModelBlokPower.addtableModel(this.selectAll.select,this.paginatornameModelBlokPowers,null,this.tableModelIbp,this.templateModelIbp);
        this.loadMessage.push(message);
        message = await this.nameProizvoditelBlock.addtableModel(this.selectAll.select,this.paginatornameProizvoditelBlocks,null,this.tableProizvoditelIbp,this.templateProizvoditelIbp);
        this.loadMessage.push(message);
        message = await this.nameFullModel.addtableModel(this.selectAll.select,this.paginatornameFullModels,null,this.tableModelMfu,this.templateModelMfu);
        this.loadMessage.push(message);
        message = await this.nameFullProizvoditel.addtableModel(this.selectAll.select,this.paginatornameFullProizvoditels,null,this.tableProizvoditelMfu,this.templateProizvoditelMfu);
        this.loadMessage.push(message);
        message = await this.nameClassification.addtableModel(this.selectAll.select,this.paginatornameClassifications,null,this.tableClassificationMfu,this.templateClassificationMfu);
        this.loadMessage.push(message);
        message = await this.nameCopySave.addtableModel(this.selectAll.select,this.paginatornameCopySaves,null,this.tableCopySave,this.templateCopySave);
        this.loadMessage.push(message);
        message = await this.nameKabinet.addtableModel(this.selectAll.select,this.paginatornameKabinets,null,this.tableKabinet,this.templateKabinet);
        this.loadMessage.push(message);
        message = await this.nameSupply.addtableModel(this.selectAll.select,this.paginatornameSupplys,null,this.tableSupple,this.templateSupple);
        this.loadMessage.push(message);
        message = await this.nameStatusing.addtableModel(this.selectAll.select,this.paginatornameStatusings,null,this.tableStatus,this.templateStatus);
        this.loadMessage.push(message);
        message = await this.nameModelSwithe.addtableModel(this.selectAll.select,this.paginatornameModelSwithe,null,this.tableSwithe,this.templateSwithe);
        this.loadMessage.push(message);
        this.isload = false;
    }

    
    async sendserver(){
        await this.selectAll.allnamemonitor();
        await this.selectAll.allcopysave();
        await this.selectAll.allkabinet();
        await this.selectAll.allmodel();
        await this.selectAll.allnamesysblok();
        await this.selectAll.allstatysing();
        await this.selectAll.allproizvoditel();
        await this.selectAll.allsupply();
        await this.selectAll.allproizvoditelblockpower();
        await this.selectAll.allmodelblockpower();
        await this.selectAll.allclassification();
        await this.selectAll.allmodelswithes();
    }

}