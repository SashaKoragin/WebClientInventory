import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { GenerateParametrs,LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { DesirilizeXml, Document,Documents,ModelReturn } from '../../../ModelInventory/InventoryModel';
import { MatTableDataSource,MatPaginator} from '@angular/material';
import { deserialize } from 'class-transformer';
import { AddFile } from '../../../AddFullModel/ModelTable/FileModel';

@Component(({
    selector: 'equepment',
    templateUrl: '../Html/DocumentSelect.html',
    styleUrls: ['../Html/DocumentSelect.css'],
    providers: [SelectAllParametrs]
}) as any)
export class DocumentSelect implements OnInit {

    constructor(public select:SelectAllParametrs) { }

  //  @ViewChild('myInput',{static: false}) ref: ElementRef;


    selecting:GenerateParametrs
    logica:LogicaDataBase = new LogicaDataBase();
    selectsql:DesirilizeXml = new DesirilizeXml();
    displaydataSource: string[] = ['Id', 'IdNamedocument','IdUser','NameDocument', 'InfoUserFile', 'IsFileExists', 'Namefile', 'TypeFile','IsActual','Download'];
    dataSource: MatTableDataSource<Document>;
    @ViewChild(MatPaginator,{static: false}) paginatordataSource: MatPaginator;

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(4)).subscribe((model:ModelSelect)=>{
            this.selecting = new GenerateParametrs(model);
        })    
      }

    update(){
        try {
            if(this.selecting.errorModel()){
             this.logica.logicaselect(); //Закрываем логику выбора
             this.logica.logicaprogress();  //Открываем логику загрузки
             this.select.selectusersql(this.selecting.generatecommand()).subscribe((model)=>{
                this.selectsql.Documents = deserialize<Documents>(Documents,model.toString()); //Динамический язык
                this.logica.logicaprogress();
                this.logica.logicadatabase();
                if(this.selectsql.Documents!=null){
                    this.dataSource = new MatTableDataSource<Document>(this.selectsql.Documents.Document)
                    this.dataSource.paginator = this.paginatordataSource;
                    this.logica.errornull = true;
                }else{
                    this.logica.errornull = false;
                }
             })
             }
            else{
                alert('Существуют ошибки в выборке!!!');
             }
         } catch (e) {
         alert(e.toString());
         }
    }

    donload(element:Document){
         if(element.IsFileExists){
            this.select.selectdocument(element.Id).subscribe(data=>{
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
         }else{
            alert("Отсутствует документ загрузите его по BareCode");
         }
    }

    delete(element:Document){
    if(element.IsActual ===false){
    this.select.deletedocument(element.Id).subscribe((model:string) =>{
          if(model){
            console.log(model);
            this.select.selectusersql(this.selecting.generatecommand()).subscribe((model)=>{
                this.selectsql.Documents = deserialize<Documents>(Documents,model.toString()); //Динамический язык
                this.dataSource = new MatTableDataSource<Document>(this.selectsql.Documents.Document)
                this.dataSource.paginator = this.paginatordataSource;
            });
          }else{
            console.log("Отсутствует документ на сервере за номером "+element.Id);
          }
       });
    }
    else{
        alert('Нельзя удалить Актуальный документ!!!')
    }
    }

    back() {
        this.logica.logicadatabase();; //Закрываем логику Данных
        this.logica.logicaselect(); //Открываем логику загрузки
    }    
}