import { Component, OnInit, ViewChild } from '@angular/core';
import {PostInventar, EditAndAdd } from '../../../Post RequestService/PostRequest';
import { PrinterTableModel, ScanerAndCamerTableModel, MfuTableModel, SysBlockTableModel, MonitorsTableModel } from '../../AddFullModel/ModelTable/TableModel';
import {MatPaginator, MatSort} from '@angular/material';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Equipment.html',
    styleUrls: ['../Html/Equipment.css'],
    providers: [EditAndAdd]

}) as any)

export class Equipment implements OnInit {
  constructor(public editandadd:EditAndAdd,public selectAll:PostInventar) { }

     @ViewChild('printers') paginatorptinter: MatPaginator;
     @ViewChild(MatSort) sortprinter: MatSort;
     @ViewChild('scaners') paginatorscaner: MatPaginator;
     @ViewChild(MatSort) sortscaner: MatSort;
     @ViewChild('mfus') paginatormfu: MatPaginator;
     @ViewChild(MatSort) sortmfu: MatSort;
     @ViewChild('sysbloks') paginatorsysblok: MatPaginator;
     @ViewChild(MatSort) sortsysblok: MatSort;
     @ViewChild('monitors') paginatormonitors: MatPaginator;
     @ViewChild(MatSort) sortmonitors: MatSort;

   public printer: PrinterTableModel = new PrinterTableModel(this.editandadd);  
   public scaner: ScanerAndCamerTableModel = new ScanerAndCamerTableModel(this.editandadd); 
   public mfu: MfuTableModel = new MfuTableModel(this.editandadd); 
   public sysblok:SysBlockTableModel = new SysBlockTableModel(this.editandadd);
   public monitor:MonitorsTableModel = new MonitorsTableModel(this.editandadd);

  ngOnInit(): void {
    this.printer.addtableModel(this.selectAll.select,this.paginatorptinter,this.sortprinter);
  }

  index(index:any){
    switch(index.index){
      case 0:
        if(this.printer.dataSource.data){
          this.printer.addtableModel(this.selectAll.select,this.paginatorptinter,this.sortprinter);
        }
        break;
      case 1:
        if(this.scaner.dataSource.data){
          this.scaner.addtableModel(this.selectAll.select,this.paginatorscaner,this.sortscaner);
        }
        break;
      case 2:
        if(this.mfu.dataSource.data){
          this.mfu.addtableModel(this.selectAll.select,this.paginatormfu,this.sortmfu);
        }
        break;
      case 3:
        if(this.sysblok.dataSource.data){
          this.sysblok.addtableModel(this.selectAll.select,this.paginatorsysblok,this.sortsysblok);
        }
        break;
      case 4:
          if(this.sysblok.dataSource.data){
            this.monitor.addtableModel(this.selectAll.select,this.paginatormonitors,this.sortmonitors);
          }
        break;
    }
  }

}