import { Component,OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';
import { GenerateParametrs } from '../../AllSelectModel/GenerateParametrFront';



@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Invent.html',
    styleUrls: ['../Html/Invent.css'],
    providers: [SelectAllParametrs]
}) as any)

export class Invent implements OnInit {
    constructor(public select:SelectAllParametrs) { }

    selecting:GenerateParametrs

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(1)).subscribe((model:ModelSelect)=>{
          this.selecting = new GenerateParametrs(model);
        })              
    }

    update(){
        try {
           if(this.selecting.errorModel()){
          //  this.selecting.logicaselect(); //Закрываем логику выбора
          //  this.selecting.logicaprogress();  //Открываем логику загрузки
              this.selecting.generatecommand();
            }
           else{
               alert('Существуют ошибки в выборке!!!');
            }

        } catch (e) {
        alert(e.toString());
        }
      
    }
}