import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { DesirilizeXml, Document, Documents, ModelReturn } from '../../../ModelInventory/InventoryModel';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { deserialize } from 'class-transformer';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { Select } from '../../../AddFullModel/ModelViewSelect/View/SelectView';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/DocumentSelect.html',
    styleUrls: ['../Html/DocumentSelect.css'],
    providers: [SelectAllParametrs]
}) as any)
export class DocumentSelect implements OnInit {

    constructor(public select: SelectAllParametrs) { }


    @ViewChild('DocumentModel', { static: false }) selectionChild: Select;
    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs = null;
    columns: Table = this.dinamicmodel.columnsdocumentModel[0];

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.documentModel[0].indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.columnsdocumentModel[this.dinamicmodel.documentModel[0].indexcolumnmodel]
        })
    }

    donload(element: Document) {
        if (element.IsFileExists) {
            this.select.selectdocument(element.Id).subscribe(data => {
                var blob = new Blob([data], { type: 'image/tiff' });
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = element.Namefile;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
        } else {
            alert("Отсутствует документ загрузите его по BareCode");
        }
    }

    delete(element: Document) {
        this.select.deletedocument(element.Id).subscribe((model: string) => {
            if (model) {
                this.selectionChild.updateProcedure();
                console.log("Документ за номером " + element.Id + " удален!");
            } else {
                console.log("Отсутствует документ на сервере за номером " + element.Id);
            }
        });
    }
}