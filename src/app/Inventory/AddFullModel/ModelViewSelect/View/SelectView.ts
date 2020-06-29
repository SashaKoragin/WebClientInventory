import { Component, Input, ViewChild, ElementRef, Renderer2, AfterViewInit, TemplateRef } from '@angular/core';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import * as XLSX from 'xlsx';
import { Table } from '../../ModelTable/DynamicTableModel';

@Component(({
  selector: 'selectsql',
  templateUrl: '../Html/SelectView.html',
  styleUrls: ['../Html/SelectView.css'],
}) as any)

export class Select {


  @ViewChild('TABLE', { static: false }) table: ElementRef;

  //Шаблон кнопок в таблице
  @Input() logicstooltable: TemplateRef<any>;
  //Шаблон Панель инструментов
  @Input() toolpanel: TemplateRef<any>;

  @Input() logica: LogicaDataBase;
  @Input() columns: Table;
  @Input() selecting: GenerateParametrs;
  @Input() select: SelectAllParametrs;

  @ViewChild('tables', { static: false }) paginator: MatPaginator;

  update() {
    try {
      if (this.selecting.errorModel()) {
        this.logica.logicaselect(); //Закрываем логику выбора
        this.logica.logicaprogress();  //Открываем логику загрузки
        this.columns.Colums = [];    //Обнулить колонки
        this.select.selectusersql(this.selecting.generatecommandxml(this.columns)).subscribe((model: string) => {
          this.logica.errornull = true;
          if (model !== "null") {
            this.columns.Model.data = (JSON.parse(model)[this.columns.Type])
            this.columns.displayedColumns = this.columns.Colums.map(c => c.columnDef);
            this.columns.allCountRow = this.columns.Model.data.length;
          }
          else {
            this.logica.errornull = false;  //Показать ошибку пустых данных
          }
          this.columns.Model.paginator = this.paginator;
          this.logica.logicaprogress();    //Открываем логику данных
          this.logica.logicadatabase();    //Закрываем логику загрузки
        })
      }
      else {
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
    this.columns.displayedColumns = null;
  }

  FilterDataTable(filterValue: string) {
    this.columns.Model.filter = filterValue.trim().toLowerCase();
  }


  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    var wscols = [];
    for (var key in ws) {
      if (key.indexOf('1') == 1) {
        wscols.push({ wpx: 200 })
      }
    }
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Таблица');
    XLSX.writeFile(wb, 'Отчет.xlsx');
  }

  ///Цвет ячейки из БД статус
  returnColorColumns(row: any): string {
    if (row.match(/#/)) {
      return row;
    }
    return null;
  }

}