import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostInventar, EditAndAdd, AuthIdentificationSignalR, AuthIdentification } from '../../../Post RequestService/PostRequest';
import { PrinterTableModel, ScanerAndCamerTableModel, MfuTableModel, SysBlockTableModel, MonitorsTableModel, BlockPowerTableModel, SwitchTableModel, ServerEquipmentTableModel, TokenTableModel, OtherAllTableModel } from '../../AddFullModel/ModelTable/TableModel';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';
import { DatePipe } from '@angular/common';
import { AllUsersFilters } from '../../ModelInventory/InventoryModel';
import { MenuAksiok } from '../../AddFullModel/DialogAksiokEditAndAdd/DialogAksiokModel/ModelAksiokMenu';




@Component(({
  selector: 'equepment',
  templateUrl: '../Html/Equipment.html',
  styleUrls: ['../Html/Equipment.css'],
  providers: [EditAndAdd, DatePipe]

}) as any)

export class Equipment implements OnInit {

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

  ///Шаблоны
  @ViewChild('TEMPLATEPRINTER', { static: true }) templatePrinter: ElementRef;
  @ViewChild('TEMPLATESCANER', { static: true }) templateScaner: ElementRef;
  @ViewChild('TEMPLATEMFU', { static: true }) templateMfu: ElementRef;
  @ViewChild('TEMPLATESYSBLOK', { static: true }) templateSysblok: ElementRef;
  @ViewChild('TEMPLATEMONITOR', { static: true }) templateMonitor: ElementRef;
  @ViewChild('TEMPLATEBLOCKPOWER', { static: true }) templateBlockpower: ElementRef;
  @ViewChild('TEMPLATESWITHES', { static: true }) templateSwithes: ElementRef;
  @ViewChild('TEMPLATESERVEREQUIPMENT', { static: true }) templateServerEquipment: ElementRef;
  @ViewChild('TEMPLATEOTHERALL', { static: true }) templateOtherAll: ElementRef;

  isload: boolean = true;
  loadMessage: string[] = []
  @ViewChild('printers', { static: true }) paginatorptinter: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortprinter: MatSort;
  @ViewChild('scaners', { static: true }) paginatorscaner: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortscaner: MatSort;
  @ViewChild('mfus', { static: true }) paginatormfu: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortmfu: MatSort;
  @ViewChild('sysbloks', { static: true }) paginatorsysblok: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortsysblok: MatSort;
  @ViewChild('monitors', { static: true }) paginatormonitors: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortmonitors: MatSort;
  @ViewChild('blockpowers', { static: true }) paginatorblockpower: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortblockpower: MatSort;
  @ViewChild('swithes', { static: true }) paginatorswithes: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortswithes: MatSort;
  @ViewChild('serverEquipments', { static: true }) paginatorServerEquipments: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortServerEquipment: MatSort;

  @ViewChild('otherAlls', { static: true }) paginatorOtherAll: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortOtherAll: MatSort;



  @ViewChild('TABLEPRINTERS', { static: false }) tableprinters: ElementRef;
  @ViewChild('TABLESCANERS', { static: false }) tablescaners: ElementRef;
  @ViewChild('TABLEMFUS', { static: false }) tablemfus: ElementRef;
  @ViewChild('TABLESYSBLOKS', { static: false }) tablesysbloks: ElementRef;
  @ViewChild('TABLEMONITORS', { static: false }) tablemonitors: ElementRef;
  @ViewChild('TABLEBLOCKPOWERS', { static: false }) tableblockpowers: ElementRef;
  @ViewChild('TABLESWITHES', { static: false }) tableswithes: ElementRef;
  @ViewChild('TABLESERVEREQUIPMENT', { static: false }) tableServerEquipment: ElementRef;
  @ViewChild('TABLESEOTHERALL', { static: false }) tableOtherAll: ElementRef;

  excel: ImportToExcel = new ImportToExcel();

  public printer: PrinterTableModel = new PrinterTableModel(this.editandadd, this.SignalR);
  public scaner: ScanerAndCamerTableModel = new ScanerAndCamerTableModel(this.editandadd, this.SignalR);
  public mfu: MfuTableModel = new MfuTableModel(this.editandadd, this.SignalR);
  public sysblok: SysBlockTableModel = new SysBlockTableModel(this.editandadd, this.SignalR);
  public monitor: MonitorsTableModel = new MonitorsTableModel(this.editandadd, this.SignalR);
  public blockpower: BlockPowerTableModel = new BlockPowerTableModel(this.editandadd, this.SignalR);
  public switch: SwitchTableModel = new SwitchTableModel(this.editandadd, this.SignalR)
  public serverEquipment: ServerEquipmentTableModel = new ServerEquipmentTableModel(this.editandadd, this.SignalR)
  public otherall: OtherAllTableModel = new OtherAllTableModel(this.editandadd, this.SignalR)


  public MenuAksiok: MenuAksiok = new MenuAksiok()

  public MenuAksiok:MenuAksiok = new MenuAksiok()

  public async ngOnInit(): Promise<void> {
    await this.start()
  }

  ///Создание QR Code Model SerialNumber
  createQRCode(serialNumber: string, isAll: boolean = false) {
    if (serialNumber) {
      this.editandadd.createQRCode(serialNumber, isAll);
    }
    else {
      alert(`У оборудования отсутствует серийный номер - ${serialNumber}!`)
    }
  }

  async start() {
    var message = null;
    await this.sendserver();
    await this.selectAll.allprinters();
    message = await this.printer.addtableModel(this.selectAll.select, this.paginatorptinter, this.sortprinter, this.tableprinters, this.templatePrinter);;
    this.loadMessage.push(message);
    await this.selectAll.allscaners();
    message = await this.scaner.addtableModel(this.selectAll.select, this.paginatorscaner, this.sortscaner, this.tablescaners, this.templateScaner);
    this.loadMessage.push(message);
    await this.selectAll.allmfu();
    message = await this.mfu.addtableModel(this.selectAll.select, this.paginatormfu, this.sortmfu, this.tablemfus, this.templateMfu);
    this.loadMessage.push(message);
    await this.selectAll.allsysblok();
    message = await this.sysblok.addtableModel(this.selectAll.select, this.paginatorsysblok, this.sortsysblok, this.tablesysbloks, this.templateSysblok);
    this.loadMessage.push(message);
    await this.selectAll.allmonitor();
    message = await this.monitor.addtableModel(this.selectAll.select, this.paginatormonitors, this.sortmonitors, this.tablemonitors, this.templateMonitor);
    this.loadMessage.push(message);
    await this.selectAll.allblockpower();
    message = await this.blockpower.addtableModel(this.selectAll.select, this.paginatorblockpower, this.sortblockpower, this.tableblockpowers, this.templateBlockpower);
    this.loadMessage.push(message);
    await this.selectAll.allswithes();
    message = await this.switch.addtableModel(this.selectAll.select, this.paginatorswithes, this.sortswithes, this.tableswithes, this.templateSwithes);
    this.loadMessage.push(message);
    await this.selectAll.allServerEquipment();
    message = await this.serverEquipment.addtableModel(this.selectAll.select, this.paginatorServerEquipments, this.sortServerEquipment, this.tableServerEquipment, this.templateServerEquipment)
    this.loadMessage.push(message);
    await this.selectAll.allOtherAll();
    message = await this.otherall.addtableModel(this.selectAll.select, this.paginatorOtherAll, this.sortOtherAll, this.tableOtherAll, this.templateOtherAll);
    this.loadMessage.push(message);
    this.isload = false;
  }

  async sendserver() {
    var allUsersFilters = new AllUsersFilters()
    allUsersFilters.filterActualField.isFilterField = true;
    await this.selectAll.allTemplate();
    await this.selectAll.alluser(allUsersFilters);
    await this.selectAll.allnamemonitor();
    await this.selectAll.allcopysave();
    await this.selectAll.allmodel();
    await this.selectAll.allnamesysblok();
    await this.selectAll.allproizvoditel();
    await this.selectAll.allkabinet();
    await this.selectAll.allstatysing();
    await this.selectAll.allsupply();
    await this.selectAll.allproizvoditelblockpower();
    await this.selectAll.allmodelblockpower();
    await this.selectAll.allmodelswithes();
    await this.selectAll.allModelSeverEquipment();
    await this.selectAll.allManufacturerSeverEquipment();
    await this.selectAll.allTypeServer();
    await this.selectAll.allTypeOther();
    await this.selectAll.allProizvoditelOther();
    await this.selectAll.allModelOther();
  }

  isloadStatistic: boolean = false;
  statusStatistic: string = null;
  //Запрос для статистики серверов
  public async statisticServer() {
    this.isloadStatistic = true;
    this.statusStatistic = "Запущенa проверка доступности серверов!!!"
    await this.selectAll.statisticServerIsWork();
    this.isloadStatistic = false;
    this.statusStatistic = "Завершена проверка доступности серверов!!!"
  }

}