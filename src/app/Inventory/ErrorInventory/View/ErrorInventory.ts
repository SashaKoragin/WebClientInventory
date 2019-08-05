import { Component, OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs,LogicaDataBase } from '../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { DynamicTableColumnModel } from '../../AddFullModel/ModelTable/DynamicTableModel';

@Component(({
    selector: 'error',
    templateUrl: '../Html/ErrorInventory.html',
    styleUrls: ['../Html/ErrorInventory.css'],
    providers: [SelectAllParametrs]

}) as any)

export class ErrorInventory implements OnInit {
    constructor(public select:SelectAllParametrs) { }
    dinamicmodel:DynamicTableColumnModel = new DynamicTableColumnModel();
    logica:LogicaDataBase = new LogicaDataBase();
    selecting:GenerateParametrs;
    columns:any = this.dinamicmodel.columns[this.dinamicmodel.mainselect.indexcolumnmodel];
    ngOnInit(): void {
        this.errorserver(null)
    }


    errorserver(type:any){
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainselect.indexsevr)).subscribe((model:ModelSelect)=>{
            this.selecting = new GenerateParametrs(model);
            this.columns = this.dinamicmodel.columns[this.dinamicmodel.mainselect.indexcolumnmodel]
          })
    }
}

