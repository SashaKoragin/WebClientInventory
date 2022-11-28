import { Component, Input, OnInit, TemplateRef, ElementRef, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { SelectTableModel, Table } from '../../ModelTable/DynamicTableModel';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material';
@Component(({
    selector: 'SelectFormSql',
    templateUrl: '../Html/FileServerSelect.html',
    styleUrls: ['../Html/FileServerSelect.css'],
    providers: [SelectAllParametrs]
}) as any)

export class SelectFormSql implements OnInit {
    constructor(public select: SelectAllParametrs) { }

    //Выборка представления
    @Input() selectFileServer: SelectTableModel[];

    //Шаблон кнопок в таблице
    @Input() logicstooltable: TemplateRef<any>;
    //Шаблон Панель инструментов
    @Input() toolpanel: TemplateRef<any>;

    @Output() onChangedBack = new EventEmitter<boolean>();

    @Output() onChangedBackSelect = new EventEmitter<GenerateParametrs>();

    @ViewChild(MatSort, { static: false }) sortDinamicTable: MatSort;

    @ViewChild('TABLE', { static: false }) table: ElementRef;

    @ViewChild('tables', { static: false }) paginator: MatPaginator;

    //Первичная выборка
    public mainselectFileServer: SelectTableModel;
    //Логика генерации
    public logica: LogicaDataBase;
    //Параметры генерации
    public selecting: GenerateParametrs;
    //Колонки таблицы
    public columns: Table = new Table();

    ngOnInit(): void {

        this.mainselectFileServer = this.selectFileServer[0];
        this.logica = new LogicaDataBase();
        this.selectFunctionType();
    }


    public selectModel(type: any) {
        this.back();
        this.selectFunctionType();
    }

    ///Цвет ячейки из БД статус
    returnColorColumns(row: any): string {
        if (row.match(/#/)) {
            return row;
        }
        return null;
    }

    //Общее событие ввода
    private eventSelVoid() {
        this.back();
        this.selectServerEvent();
    }




    private selectFunctionType() {
        this.select.addselectallparametrs(new ModelSelect(this.mainselectFileServer.indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model, true);
            this.columns = this.mainselectFileServer.table;
            this.selectServerEvent();
        })
    }

    private selectServerEvent() {
        try {
            if (this.selecting.errorModel()) {
                this.logica.logicaprogress();  //Открываем логику загрузки
                this.columns.Colums = [];    //Обнулить колонки
                this.select.selectusersql(this.selecting.generatecommandxml(this.columns, true)).subscribe((model: string) => {
                    this.logica.errornull = true;
                    if (model !== "null") {
                        this.delay(500);
                        this.columns.Model.data = (JSON.parse(model)[this.columns.Type])
                        this.columns.displayedColumns = this.columns.Colums.map(c => c.columnDef.split('.')[1]);
                        this.columns.allCountRow = this.columns.Model.data.length;
                    }
                    else {
                        this.logica.errornull = false;  //Показать ошибку пустых данных
                    }
                    this.columns.Model.paginator = this.paginator;
                    this.columns.Model.sort = this.sortDinamicTable;
                    this.logica.logicaprogress();    //Открываем логику данных
                    this.logica.logicadatabase();    //Закрываем логику загрузки
                    this.onChangedBackSelect.emit(this.selecting); 
                })
            }
            else {
                console.log('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    //Назад
    private back() {
        this.logica.logicadatabase();; //Закрываем логику Данных
        this.columns.displayedColumns = null;
        this.onChangedBack.emit(true);
    }

    //Костыль дожидаемся обновление DOM
    async delay(ms: number): Promise<void> {
        await new Promise(resolve => setTimeout(() => resolve(null), ms)).then(() => console.log("Задержка подгрузки DOM!!!"));
    }
}