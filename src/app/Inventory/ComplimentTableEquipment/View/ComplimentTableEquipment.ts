import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR } from '../../../Post RequestService/PostRequest';
import {
    NameSysBlockTableModel, NameModelSwitheTableModel, NameMonitorTableModel, NameModelBlokPowerTableModel, NameProizvoditelBlockPowerTableModel,
    NameFullModelTableModel, NameFullProizvoditelTableModel, NameClassificationTableModel, NameCopySaveTableModel,
    NameSupplyTableModel, NameKabinetTableModel, NameStatusingTableModel, ModelSeverEquipmenTableModel, ManufacturerSeverEquipmentTableModel
} from '../../AddFullModel/ModelTable/TableModel';
import { MatPaginator, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { TypeServerTableModel, ResourceItTableModel, TaskAis3TableModel, TypeOtherTableModel, ProizvoditelOtherTableModel, ModelOtherTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../AddFunctionConvertDate/ConvertDateModel';
@Component(({
    selector: 'complimentTableEquipment',
    templateUrl: '../Html/ComplimentTableEquipment.html',
    styleUrls: ['../Html/ComplimentTableEquipment.css'],
    providers: [
        EditAndAdd,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },]
}) as any)

export class ComplimentTableEquipment implements OnInit {

    constructor(public editandadd: EditAndAdd, public selectAll: PostInventar, public SignalR: AuthIdentificationSignalR) { }

    //Шаблоны
    @ViewChild('TEMPLATEMODELSYSBLOCK', { static: true }) templateModelSysBlock: ElementRef;
    @ViewChild('TEMPLATEMODELMONITOR', { static: false }) templateModelMonitor: ElementRef;
    @ViewChild('TEMPLATEMODELIBP', { static: false }) templateModelIbp: ElementRef;
    @ViewChild('TEMPLATEPROIZVODITELIBP', { static: false }) templateProizvoditelIbp: ElementRef;
    @ViewChild('TEMPLATECLASSIFICATIONMFU', { static: false }) templateClassificationMfu: ElementRef;
    @ViewChild('TEMPLATEMODELMFU', { static: false }) templateModelMfu: ElementRef;
    @ViewChild('TEMPLATEPROIZVODITELMFU', { static: false }) templateProizvoditelMfu: ElementRef;
    @ViewChild('TEMPLATECOPYSAVE', { static: false }) templateCopySave: ElementRef;
    @ViewChild('TEMPLATEKABINET', { static: false }) templateKabinet: ElementRef;
    @ViewChild('TEMPLATESTATUS', { static: false }) templateStatus: ElementRef;
    @ViewChild('TEMPLATESUPPLE', { static: false }) templateSupple: ElementRef;
    @ViewChild('TEMPLATESWITHE', { static: false }) templateSwithe: ElementRef;

    @ViewChild('TEMPLATESERVERTYPE', { static: false }) templateServerType: ElementRef;
    @ViewChild('TEMPLATEMODELSERVEREQUIPMENT', { static: false }) templateModelSeverEquipment: ElementRef;
    @ViewChild('TEMPLATEMANUFACTURERSERVEREQUIPMENT', { static: false }) templateManufacturerSeverEquipment: ElementRef;

    @ViewChild('TEMPLATERESOURCEIT', { static: false }) templateResourceIt: ElementRef;
    @ViewChild('TEMPLATETASKAIS3', { static: false }) templateTaskAis3: ElementRef;

    @ViewChild('TEMPLATETYPEOTHER', { static: false }) templateTypeOther: ElementRef;
    @ViewChild('TEMPLATEPROIZVODITELOTHER', { static: false }) templateProizvoditelOther: ElementRef;
    @ViewChild('TEMPLATEMODELOTHER', { static: false }) templateModelOther: ElementRef;

    //Таблицы
    @ViewChild('TABLEMODELSYSBLOCK', { static: false }) tableModelSysBlock: ElementRef;
    @ViewChild('TABLEMODELMONITOR', { static: false }) tableModelMonitor: ElementRef;
    @ViewChild('TABLEPROIZVODITELIBP', { static: false }) tableProizvoditelIbp: ElementRef;
    @ViewChild('TABLEMODELIBP', { static: false }) tableModelIbp: ElementRef;
    @ViewChild('TABLECLASSIFICATIONMFU', { static: false }) tableClassificationMfu: ElementRef;
    @ViewChild('TABLEMODELMFU', { static: false }) tableModelMfu: ElementRef;
    @ViewChild('TABLEPROIZVODITELMFU', { static: false }) tableProizvoditelMfu: ElementRef;
    @ViewChild('TABLECOPYSAVE', { static: false }) tableCopySave: ElementRef;
    @ViewChild('TABLEKABINET', { static: false }) tableKabinet: ElementRef;
    @ViewChild('TABLESTATUS', { static: false }) tableStatus: ElementRef;
    @ViewChild('TABLESUPPLE', { static: false }) tableSupple: ElementRef;
    @ViewChild('TABLESWITHE', { static: false }) tableSwithe: ElementRef;

    @ViewChild('TABLESERVERTYPE', { static: false }) tableServerType: ElementRef;
    @ViewChild('TABLEMODELSERVEREQUIPMENT', { static: false }) tableModelSeverEquipment: ElementRef;
    @ViewChild('TABLEMANUFACTURERSERVEREQUIPMENT', { static: false }) tableManufacturerSeverEquipment: ElementRef;

    @ViewChild('TABLERESOURCEIT', { static: false }) tableResourceIt: ElementRef;
    @ViewChild('TABLETASKAIS3', { static: false }) tableTaskAis3: ElementRef;

    @ViewChild('TABLETYPEOTHER', { static: false }) tableTypeOther: ElementRef;
    @ViewChild('TABLEPROIZVODITELOTHER', { static: false }) tableProizvoditelOther: ElementRef;
    @ViewChild('TABLEMODELOTHER', { static: false }) tableModelOther: ElementRef;

    isload: boolean = true;
    loadMessage: string[] = []
    @ViewChild('nameMonitors', { static: false }) paginatornameMonitors: MatPaginator;
    @ViewChild('nameSysBlocks', { static: false }) paginatornameSysBlocks: MatPaginator;
    @ViewChild('nameModelBlokPowers', { static: false }) paginatornameModelBlokPowers: MatPaginator;
    @ViewChild('nameProizvoditelBlocks', { static: false }) paginatornameProizvoditelBlocks: MatPaginator;
    @ViewChild('nameFullModels', { static: false }) paginatornameFullModels: MatPaginator;
    @ViewChild('nameFullProizvoditels', { static: false }) paginatornameFullProizvoditels: MatPaginator;
    @ViewChild('nameClassifications', { static: false }) paginatornameClassifications: MatPaginator;
    @ViewChild('nameCopySaves', { static: false }) paginatornameCopySaves: MatPaginator;
    @ViewChild('nameKabinets', { static: false }) paginatornameKabinets: MatPaginator;
    @ViewChild('nameSupplys', { static: false }) paginatornameSupplys: MatPaginator;
    @ViewChild('nameStatusings', { static: false }) paginatornameStatusings: MatPaginator;
    @ViewChild('nameModelSwithes', { static: false }) paginatornameModelSwithe: MatPaginator;

    @ViewChild('nameServerTypes', { static: false }) paginatornameServerType: MatPaginator;
    @ViewChild('nameModelSeverEquipments', { static: false }) paginatornameModelSeverEquipment: MatPaginator;
    @ViewChild('nameManufacturerSeverEquipments', { static: false }) paginatornameManufacturerSeverEquipment: MatPaginator;

    @ViewChild('nameResourceIts', { static: false }) paginatornameResourceIt: MatPaginator;
    @ViewChild('nameTaskAis3s', { static: false }) paginatornameTaskAis3: MatPaginator;

    @ViewChild('nameTypeOthers', { static: false }) paginatornameTypeOther: MatPaginator;
    @ViewChild('nameProizvoditelOthers', { static: false }) paginatornameProizvoditelOther: MatPaginator;
    @ViewChild('nameModelOthers', { static: false }) paginatornameModelOther: MatPaginator;

    public nameSysBlock: NameSysBlockTableModel = new NameSysBlockTableModel(this.editandadd, this.SignalR);
    public nameMonitor: NameMonitorTableModel = new NameMonitorTableModel(this.editandadd, this.SignalR);
    public nameModelBlokPower: NameModelBlokPowerTableModel = new NameModelBlokPowerTableModel(this.editandadd, this.SignalR)
    public nameProizvoditelBlock: NameProizvoditelBlockPowerTableModel = new NameProizvoditelBlockPowerTableModel(this.editandadd, this.SignalR)
    public nameFullModel: NameFullModelTableModel = new NameFullModelTableModel(this.editandadd, this.SignalR)
    public nameFullProizvoditel: NameFullProizvoditelTableModel = new NameFullProizvoditelTableModel(this.editandadd, this.SignalR)
    public nameClassification: NameClassificationTableModel = new NameClassificationTableModel(this.editandadd, this.SignalR)
    public nameCopySave: NameCopySaveTableModel = new NameCopySaveTableModel(this.editandadd, this.SignalR)
    public nameKabinet: NameKabinetTableModel = new NameKabinetTableModel(this.editandadd, this.SignalR);
    public nameSupply: NameSupplyTableModel = new NameSupplyTableModel(this.editandadd, this.SignalR);
    public nameStatusing: NameStatusingTableModel = new NameStatusingTableModel(this.editandadd, this.SignalR);
    public nameModelSwithe: NameModelSwitheTableModel = new NameModelSwitheTableModel(this.editandadd, this.SignalR);

    public nameServerType: TypeServerTableModel = new TypeServerTableModel(this.editandadd, this.SignalR);
    public nameModelSeverEquipment: ModelSeverEquipmenTableModel = new ModelSeverEquipmenTableModel(this.editandadd, this.SignalR)
    public nameManufacturerSeverEquipment: ManufacturerSeverEquipmentTableModel = new ManufacturerSeverEquipmentTableModel(this.editandadd, this.SignalR)

    ///Задания для заявок
    public nameResourceIt: ResourceItTableModel = new ResourceItTableModel(this.editandadd, this.SignalR);
    public nameTaskAis3: TaskAis3TableModel = new TaskAis3TableModel(this.editandadd, this.SignalR);

    public nameTypeOther: TypeOtherTableModel = new TypeOtherTableModel(this.editandadd, this.SignalR);
    public nameProizvoditelOther: ProizvoditelOtherTableModel = new ProizvoditelOtherTableModel(this.editandadd, this.SignalR)
    public nameModelOther: ModelOtherTableModel = new ModelOtherTableModel(this.editandadd, this.SignalR)





    ngOnInit(): void {
        this.start()
    }

    async start() {
        var message = null;
        await this.sendserver();
        message = await this.nameSysBlock.addtableModel(this.selectAll.select, this.paginatornameSysBlocks, null, this.tableModelSysBlock, this.templateModelSysBlock);
        this.loadMessage.push(message);
        message = await this.nameMonitor.addtableModel(this.selectAll.select, this.paginatornameMonitors, null, this.tableModelMonitor, this.templateModelMonitor);
        this.loadMessage.push(message);
        message = await this.nameModelBlokPower.addtableModel(this.selectAll.select, this.paginatornameModelBlokPowers, null, this.tableModelIbp, this.templateModelIbp);
        this.loadMessage.push(message);
        message = await this.nameProizvoditelBlock.addtableModel(this.selectAll.select, this.paginatornameProizvoditelBlocks, null, this.tableProizvoditelIbp, this.templateProizvoditelIbp);
        this.loadMessage.push(message);
        message = await this.nameFullModel.addtableModel(this.selectAll.select, this.paginatornameFullModels, null, this.tableModelMfu, this.templateModelMfu);
        this.loadMessage.push(message);
        message = await this.nameFullProizvoditel.addtableModel(this.selectAll.select, this.paginatornameFullProizvoditels, null, this.tableProizvoditelMfu, this.templateProizvoditelMfu);
        this.loadMessage.push(message);
        message = await this.nameClassification.addtableModel(this.selectAll.select, this.paginatornameClassifications, null, this.tableClassificationMfu, this.templateClassificationMfu);
        this.loadMessage.push(message);
        message = await this.nameCopySave.addtableModel(this.selectAll.select, this.paginatornameCopySaves, null, this.tableCopySave, this.templateCopySave);
        this.loadMessage.push(message);
        message = await this.nameKabinet.addtableModel(this.selectAll.select, this.paginatornameKabinets, null, this.tableKabinet, this.templateKabinet);
        this.loadMessage.push(message);
        message = await this.nameSupply.addtableModel(this.selectAll.select, this.paginatornameSupplys, null, this.tableSupple, this.templateSupple);
        this.loadMessage.push(message);
        message = await this.nameStatusing.addtableModel(this.selectAll.select, this.paginatornameStatusings, null, this.tableStatus, this.templateStatus);
        this.loadMessage.push(message);
        message = await this.nameModelSwithe.addtableModel(this.selectAll.select, this.paginatornameModelSwithe, null, this.tableSwithe, this.templateSwithe);
        this.loadMessage.push(message);
        message = await this.nameServerType.addtableModel(this.selectAll.select, this.paginatornameServerType, null, this.tableServerType, this.templateServerType);
        this.loadMessage.push(message);
        message = await this.nameModelSeverEquipment.addtableModel(this.selectAll.select, this.paginatornameModelSeverEquipment, null, this.tableModelSeverEquipment, this.templateModelSeverEquipment);
        this.loadMessage.push(message);
        message = await this.nameManufacturerSeverEquipment.addtableModel(this.selectAll.select, this.paginatornameManufacturerSeverEquipment, null, this.tableManufacturerSeverEquipment, this.templateManufacturerSeverEquipment);
        this.loadMessage.push(message);
        message = await this.nameResourceIt.addtableModel(this.selectAll.select, this.paginatornameResourceIt, null, this.tableResourceIt, this.templateResourceIt);
        this.loadMessage.push(message);
        message = await this.nameTaskAis3.addtableModel(this.selectAll.select, this.paginatornameTaskAis3, null, this.tableTaskAis3, this.templateTaskAis3);
        this.loadMessage.push(message);
        message = await this.nameTypeOther.addtableModel(this.selectAll.select, this.paginatornameTypeOther, null, this.tableTypeOther, this.templateTypeOther);
        this.loadMessage.push(message);
        message = await this.nameProizvoditelOther.addtableModel(this.selectAll.select, this.paginatornameProizvoditelOther, null, this.tableProizvoditelOther, this.templateProizvoditelOther);
        this.loadMessage.push(message);
        message = await this.nameModelOther.addtableModel(this.selectAll.select, this.paginatornameModelOther, null, this.tableModelOther, this.templateModelOther)
        this.loadMessage.push(message);
        this.isload = false;
    }


    async sendserver() {
        await this.selectAll.allotdel();
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
        await this.selectAll.allModelSeverEquipment();
        await this.selectAll.allManufacturerSeverEquipment();
        await this.selectAll.allTypeServer();
        await this.selectAll.allResourceIt();
        await this.selectAll.allTaskAis3();
        await this.selectAll.allTypeOther();
        await this.selectAll.allProizvoditelOther();
        await this.selectAll.allModelOther();
    }
}