import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import { PrinterTableModel, ScanerAndCamerTableModel, MfuTableModel, SysBlockTableModel, MonitorsTableModel, TelephonsTableModel, BlockPowerTableModel } from '../../AddFullModel/ModelTable/TableModel';
import {MatPaginator, MatSort} from '@angular/material';
import { ImportToExcel } from '../../AddFullModel/ModelTable/PublicFunction';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Equipment.html',
    styleUrls: ['../Html/Equipment.css'],
    providers: [EditAndAdd]

}) as any)

export class Equipment implements OnInit {
  constructor(public editandadd:EditAndAdd,public selectAll:PostInventar) { }


  dateconverters(date:any){
    if(date){
      var dateOut = new Date(date);
      return dateOut;
    }
    return null;
  }

     isload:boolean = true;
     loadMessage:string[] = []
      @ViewChild('printers',{static: true}) paginatorptinter: MatPaginator;
      @ViewChild(MatSort,{static: false}) sortprinter: MatSort;
     @ViewChild('scaners',{static: true}) paginatorscaner: MatPaginator;
     @ViewChild(MatSort,{static: true}) sortscaner: MatSort;
     @ViewChild('mfus',{static: true}) paginatormfu: MatPaginator;
     @ViewChild(MatSort,{static: true}) sortmfu: MatSort;
     @ViewChild('sysbloks',{static: true}) paginatorsysblok: MatPaginator;
     @ViewChild(MatSort,{static: true}) sortsysblok: MatSort;
     @ViewChild('monitors',{static: true}) paginatormonitors: MatPaginator;
      @ViewChild(MatSort,{static: true}) sortmonitors: MatSort;
     @ViewChild('blockpowers',{static: true}) paginatorblockpower: MatPaginator;
     @ViewChild(MatSort,{static: true}) sortblockpower: MatSort;

     @ViewChild('TABLEPRINTERS',{static: false}) tableprinters: ElementRef;
     @ViewChild('TABLESCANERS',{static: false}) tablescaners: ElementRef;
     @ViewChild('TABLEMFUS',{static: false}) tablemfus: ElementRef;
     @ViewChild('TABLESYSBLOKS',{static: false}) tablesysbloks: ElementRef;
     @ViewChild('TABLEMONITORS',{static: false}) tablemonitors: ElementRef;
     @ViewChild('TABLEBLOCKPOWERS',{static: false}) tableblockpowers: ElementRef;
     excel:ImportToExcel = new ImportToExcel();

   public printer: PrinterTableModel = new PrinterTableModel(this.editandadd);  
   public scaner: ScanerAndCamerTableModel = new ScanerAndCamerTableModel(this.editandadd); 
   public mfu: MfuTableModel = new MfuTableModel(this.editandadd); 
   public sysblok:SysBlockTableModel = new SysBlockTableModel(this.editandadd);
   public monitor:MonitorsTableModel = new MonitorsTableModel(this.editandadd);
   public blockpower:BlockPowerTableModel = new BlockPowerTableModel(this.editandadd);
  ngOnInit(): void {
    this.start()
  }
  

 async start(){
     var message = null;  
     await this.sendserver();
     await this.selectAll.allprinters();
     message = await this.printer.addtableModel(this.selectAll.select,this.paginatorptinter,this.sortprinter);;
     this.loadMessage.push(message);
     await this.selectAll.allscaners();
     message = await this.scaner.addtableModel(this.selectAll.select,this.paginatorscaner,this.sortscaner);
     this.loadMessage.push(message);
     await this.selectAll.allmfu();
     message = await this.mfu.addtableModel(this.selectAll.select,this.paginatormfu,this.sortmfu);
     this.loadMessage.push(message);
     await this.selectAll.allsysblok();
     message = await this.sysblok.addtableModel(this.selectAll.select,this.paginatorsysblok,this.sortsysblok);
     this.loadMessage.push(message);
     await this.selectAll.allmonitor();
     message = await this.monitor.addtableModel(this.selectAll.select,this.paginatormonitors,this.sortmonitors);
     this.loadMessage.push(message);
     await this.selectAll.allblockpower();
     message = await this.blockpower.addtableModel(this.selectAll.select,this.paginatorblockpower,this.sortblockpower);
     this.loadMessage.push(message);
     this.isload = false;
  }

 async sendserver(){
   await this.selectAll.alluser();
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
  }
}