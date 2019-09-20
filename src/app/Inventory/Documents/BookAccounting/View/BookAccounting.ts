import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { GenerateParametrs, LogicaDataBase } from '../../../AllSelectModel/GenerateParametrFront';
import { Book,BookModels } from '../../../ModelInventory/ViewInventory';
import { MatTableDataSource,MatPaginator} from '@angular/material';
import { deserialize } from 'class-transformer';
import { DesirilizeXml } from '../../../ModelInventory/InventoryModel';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';

@Component(({
    selector: 'books',
    templateUrl: '../Html/BookAccounting.html',
    styleUrls: ['../Html/BookAccounting.css'],
    providers: [SelectAllParametrs]
}) as any)

export class BookAccounting implements OnInit {

    constructor(public select:SelectAllParametrs) { }

    selecting:GenerateParametrs
    logica:LogicaDataBase = new LogicaDataBase();
    selectsql:DesirilizeXml = new DesirilizeXml();
    displaydataSource: string[] = ['RowNum', 'Keys','Name','Id', 'Model', 'IdBook', 'Shape'];
    dataSource: MatTableDataSource<BookModels>;
    @ViewChild('books',{static: false}) paginatorbooks: MatPaginator;

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(11)).subscribe((model:ModelSelect)=>{
            this.selecting = new GenerateParametrs(model);
        })    
    }

    update(){
        try {
            if(this.selecting.errorModel()){
             this.logica.logicaselect(); //Закрываем логику выбора
             this.logica.logicaprogress();  //Открываем логику загрузки
             this.select.selectusersql(this.selecting.generatecommand()).subscribe((model)=>{
                this.selectsql.Book = deserialize<Book>(Book,model.toString()); //Динамический язык
                this.logica.logicaprogress();
                this.logica.logicadatabase();
                if(this.selectsql.Documents!=null){
                    this.dataSource = new MatTableDataSource<BookModels>(this.selectsql.Book.BookModels)
                    this.dataSource.paginator = this.paginatorbooks;
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

    back() {
        this.logica.logicadatabase();; //Закрываем логику Данных
        this.logica.logicaselect(); //Открываем логику загрузки
    }    

    shape(bookmodels:BookModels){
      this.select.generatebook(bookmodels).subscribe((model)=>{
        var blob = new Blob([model], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "Книга "+bookmodels.Model;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); 
      })
    }

    donload(element:BookModels){
        if(element.IdBook!==0){
           this.select.selectbook(element.IdBook).subscribe(data=>{
               var blob = new Blob([data], { type: 'image/tiff' });
               var url = window.URL.createObjectURL(blob);
               var a = document.createElement('a');
               a.href = url;
               a.download = "Книга "+element.Model;
               document.body.appendChild(a);
               a.click();
               document.body.removeChild(a);
               window.URL.revokeObjectURL(url);
           })
        }else{
           alert("Отсутствует документ загрузите его по BareCode");
        }
   }

}
