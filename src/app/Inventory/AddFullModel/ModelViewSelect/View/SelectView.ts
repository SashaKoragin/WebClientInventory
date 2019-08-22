import { Component,Input,ViewChild, ElementRef  } from '@angular/core';
import {GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { MatPaginator,MatTableDataSource} from '@angular/material';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import * as XLSX from 'xlsx';
import { Table } from '../../ModelTable/DynamicTableModel';

@Component(({
    selector: 'selectsql',
    templateUrl: '../Html/SelectView.html',
    styleUrls: ['../Html/SelectView.css'],
}) as any)

export class Select{

    @ViewChild('TABLE',{static: false}) table: ElementRef;
    @Input() logica:LogicaDataBase;
    @Input() columns:Table;
    @Input() selecting:GenerateParametrs;
    @Input() select:SelectAllParametrs;
    @ViewChild('tables',{static: false}) paginator: MatPaginator;
    allcountproblem:number = 0
    displayedColumns:any
    dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
    update(){
       try {
           if(this.selecting.errorModel())
           {
            this.logica.logicaselect(); //Закрываем логику выбора
            this.logica.logicaprogress();  //Открываем логику загрузки
            this.columns.Colums = [];    //Обнулить колонки
            this.select.selectusersql(this.selecting.generatecommandxml(this.columns)).subscribe((model:string)=>{
            this.logica.errornull = true;
              if(model !== "null")
              {
               this.dataSource.data =(JSON.parse(model)[this.columns.Type]);
               this.displayedColumns = this.columns.Colums.map(c => c.columnDef);
               this.allcountproblem = this.dataSource.data.length;
              }
              else{
                 this.logica.errornull = false;  //Показать ошибку пустых данных
              }
              this.dataSource.paginator = this.paginator;
              this.logica.logicaprogress();    //Открываем логику данных
              this.logica.logicadatabase();    //Закрываем логику загрузки
             })
              }
            else{
                alert('Существуют ошибки в выборке!!!');
         }
         } catch (e) {
         alert(e.toString());
        }
    }

   //Назад
    back() {
        this.logica.logicadatabase();; //Закрываем логику Данных
        this.logica.logicaselect(); //Открываем логику загрузки
        this.displayedColumns = null;
    }

ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Таблица');
  XLSX.writeFile(wb, 'Отчет.xlsx');
}
}