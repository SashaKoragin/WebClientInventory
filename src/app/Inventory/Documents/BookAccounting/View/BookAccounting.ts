import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { Book, BookModels } from '../../../ModelInventory/ViewInventory';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { deserialize } from 'class-transformer';
import { DesirilizeXml } from '../../../ModelInventory/InventoryModel';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { Select } from '../../../AddFullModel/ModelViewSelect/View/SelectView';

@Component(({
    selector: 'books',
    templateUrl: '../Html/BookAccounting.html',
    styleUrls: ['../Html/BookAccounting.css'],
    providers: [SelectAllParametrs]
}) as any)

export class BookAccounting implements OnInit {

    constructor(public select: SelectAllParametrs) { }


    @ViewChild('BookAccounting', { static: false }) selectionChild: Select;
    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs = null;
    columns: Table = this.dinamicmodel.columnsdocumentModel[1];

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.documentModel[1].indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.columnsdocumentModel[this.dinamicmodel.documentModel[1].indexcolumnmodel]
        })

    }



    shape(bookmodels: any) {
        var serverModel: BookModels = new BookModels();
        serverModel.idBookField = bookmodels.IdBook
        serverModel.idField = bookmodels.Id
        serverModel.keysField = bookmodels.Keys
        serverModel.modelField = bookmodels.Model
        serverModel.nameField = bookmodels.Name
        serverModel.rowNumField = bookmodels.RowNum
        serverModel.logicsButtonField = bookmodels.LogicsButton
        console.log(serverModel);
        this.select.generatebook(serverModel).subscribe((model) => {
            var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "Книга " + serverModel.modelField;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.selectionChild.updateProcedure();
        })
    }

    donload(element: any) {
        var serverModel: BookModels = new BookModels();
        serverModel.idBookField = element.IdBook
        serverModel.idField = element.Id
        serverModel.keysField = element.Keys
        serverModel.modelField = element.Model
        serverModel.nameField = element.Name
        serverModel.rowNumField = element.RowNum
        serverModel.logicsButtonField = element.LogicsButton
        if (serverModel.idBookField !== 0) {
            this.select.selectbook(serverModel.idBookField).subscribe(data => {
                var blob = new Blob([data], { type: 'image/tiff' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "Книга " + serverModel.modelField;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
        } else {
            alert("Отсутствует документ загрузите его по BareCode");
        }
    }

}
