import { EditAndAdd, SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LogicaDataBase, GenerateParametrs } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { deserialize } from 'class-transformer';
import { TehnicalSqlAndTreeAis3, TableTemplate, AllTemplateAndTree } from '../../../ModelInventory/InventoryModel';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/PathAis3.html',
    styleUrls: ['../Html/PathAis3.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [EditAndAdd, SelectAllParametrs]
}) as any)

export class PathAis3 implements OnInit {

    constructor(public editandadd: EditAndAdd, public select: SelectAllParametrs,) { }

    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs

    public dataSource: MatTableDataSource<AllTemplateAndTree> = new MatTableDataSource<AllTemplateAndTree>();
    public expandedElement: TableTemplate = null;
    public countMaxPaginator: number = 0;
    public globalFiltersModel = ['TableTemplate.Category', 'TableTemplate.Names', 'TableTasks.Path', 'TableTasks.Type'];
    public columnsToDisplay = ['Name'];
    @ViewChild('pathAis3', { static: true }) paginator: MatPaginator;

    public isBeginTask: boolean = true;

    ngOnInit(): void {
        this.select.isBeginTask(2).toPromise().then((isCheck: boolean) => {
            this.isBeginTask = isCheck
            if (this.isBeginTask) {
                this.select.addselectallparametrs(new ModelSelect(37)).subscribe((model: ModelSelect) => {
                    this.selecting = new GenerateParametrs(model);
                })
            }
        });
    }

    updatePathAis3() {
        try {
            if (this.selecting.errorModel()) {
                this.logica.logicaselect(); //Закрываем логику выбора
                this.logica.logicaprogress();  //Открываем логику загрузки
                this.select.selectusersql(this.selecting.generatecommand()).toPromise().then(async (model) => {
                    if (model != "null") {
                        var server = deserialize<TehnicalSqlAndTreeAis3>(TehnicalSqlAndTreeAis3, model.toString());
                        this.dataSource.data = server.AllTemplateAndTree;
                        this.countMaxPaginator = server.AllTemplateAndTree.length;
                        this.dataSource.paginator = this.paginator;
                        this.castomefiltermodel();
                    }
                    this.logica.logicaprogress();
                    this.logica.logicadatabase();
                });
            }
            else {
                alert('Существуют ошибки в выборке!!!');
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    back() {
        this.logica.logicadatabase(); //Закрываем логику Данных
        this.logica.logicaselect(); //Открываем логику загрузки
        this.dataSource.data = [];
    }

    public expandElement(element: TableTemplate) {
        if (this.expandedElement) {
            if (this.expandedElement.Names === element.Names) {
                this.expandedElement = null;
                return;
            }
        }
        this.expandedElement = element;
    }

    castomefiltermodel() {
        this.dataSource.filterPredicate = (data, filter) => {
            var tot = false;
            for (let column of this.globalFiltersModel) {
                if (column.split('.')[0] in data) {
                    if ((new Date(data[column.split('.')[0]][column.split('.')[1]].toString()).toString() == "Invalid Date")) {
                        tot = (tot || data[column.split('.')[0]][column.split('.')[1]].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                    } else {

                        var date = new Date(data[column.split('.')[0]][column.split('.')[1]].toString());
                        var m = date.toDateString().slice(4, 7) + " " + date.getDate() + " " + date.getFullYear();
                        tot = (tot || m.toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                    }
                }
                else {
                    if (data.TableTemplate[column.split('.')[0]] !== null) {
                        var i = 0
                        for (let task of data.TableTemplate.TableTasks) {
                            if (typeof (data.TableTemplate.TableTasks[i]) === 'object') {
                                if (data.TableTemplate.TableTasks[i][column.split('.')[1]]) {
                                    tot = (tot || data.TableTemplate.TableTasks[i][column.split('.')[1]].trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
                                }
                            }
                            i++;
                        }
                    }
                }
            }
            return tot;
        }
    }

    public filterstablePath(filterValue: string): void {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }


    ///Функция выбора на всякий случай
    selectViewSql(type: any) {
        console.log(type.index);
    }
}