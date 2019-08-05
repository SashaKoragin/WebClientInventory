import { Component, OnInit, ViewChild } from '@angular/core';

import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import { NameSysBlockTableModel, NameMonitorTableModel, NameModelBlokPowerTableModel, NameProizvoditelBlockPowerTableModel, NameFullModelTableModel, NameFullProizvoditelTableModel, NameClassificationTableModel, NameCopySaveTableModel, NameSupplyTableModel, NameKabinetTableModel, NameStatusingTableModel } from '../../AddFullModel/ModelTable/TableModel';
import {MatPaginator} from '@angular/material';
@Component(({
    selector: 'complimentTableEquipment',
    templateUrl: '../Html/ComplimentTableEquipment.html',
    styleUrls: ['../Html/ComplimentTableEquipment.css'],
    providers: [EditAndAdd]

}) as any)

export class ComplimentTableEquipment implements OnInit{
    constructor(public editandadd:EditAndAdd,public selectAll:PostInventar) { }

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
    public nameSysBlock: NameSysBlockTableModel = new NameSysBlockTableModel(this.editandadd);
    public nameMonitor: NameMonitorTableModel = new NameMonitorTableModel(this.editandadd);
    public nameModelBlokPower: NameModelBlokPowerTableModel = new NameModelBlokPowerTableModel(this.editandadd)
    public nameProizvoditelBlock: NameProizvoditelBlockPowerTableModel = new NameProizvoditelBlockPowerTableModel(this.editandadd) 
    public nameFullModel:NameFullModelTableModel = new NameFullModelTableModel(this.editandadd)
    public nameFullProizvoditel:NameFullProizvoditelTableModel = new NameFullProizvoditelTableModel(this.editandadd)
    public nameClassification:NameClassificationTableModel = new NameClassificationTableModel(this.editandadd)
    public nameCopySave:NameCopySaveTableModel = new NameCopySaveTableModel(this.editandadd)
    public nameKabinet: NameKabinetTableModel = new NameKabinetTableModel(this.editandadd);
    public nameSupply:NameSupplyTableModel = new NameSupplyTableModel(this.editandadd);
    public nameStatusing: NameStatusingTableModel = new NameStatusingTableModel(this.editandadd);

    ngOnInit(): void {
        this.start()   
    }

    async start(){
        var message = null;  
        await this.sendserver();
        message = await this.nameSysBlock.addtableModel(this.selectAll.select,this.paginatornameSysBlocks,null);
        this.loadMessage.push(message);
        message = await this.nameMonitor.addtableModel(this.selectAll.select,this.paginatornameMonitors,null);
        this.loadMessage.push(message);
        message = await this.nameModelBlokPower.addtableModel(this.selectAll.select,this.paginatornameModelBlokPowers,null);
        this.loadMessage.push(message);
        message = await this.nameProizvoditelBlock.addtableModel(this.selectAll.select,this.paginatornameProizvoditelBlocks,null);
        this.loadMessage.push(message);
        message = await this.nameFullModel.addtableModel(this.selectAll.select,this.paginatornameFullModels,null);
        this.loadMessage.push(message);
        message = await this.nameFullProizvoditel.addtableModel(this.selectAll.select,this.paginatornameFullProizvoditels,null);
        this.loadMessage.push(message);
        message = await this.nameClassification.addtableModel(this.selectAll.select,this.paginatornameClassifications,null);
        this.loadMessage.push(message);
        message = await this.nameCopySave.addtableModel(this.selectAll.select,this.paginatornameCopySaves,null);
        this.loadMessage.push(message);
        message = await this.nameKabinet.addtableModel(this.selectAll.select,this.paginatornameKabinets,null);
        this.loadMessage.push(message);
        message = await this.nameSupply.addtableModel(this.selectAll.select,this.paginatornameSupplys,null);
        this.loadMessage.push(message);
        message = await this.nameStatusing.addtableModel(this.selectAll.select,this.paginatornameStatusings,null);
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
    }

}