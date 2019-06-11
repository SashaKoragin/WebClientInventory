import { Component,OnInit } from '@angular/core';
import { SelectAllParametrs } from '../../../Post RequestService/PostRequest';
import { ModelSelect } from '../../AllSelectModel/ParametrModel';


@Component(({
    selector: 'equepment',
    templateUrl: '../Html/Invent.html',
    styleUrls: ['../Html/Invent.css'],
    providers: [SelectAllParametrs]
}) as any)

export class Invent implements OnInit {
    constructor(public select:SelectAllParametrs) { }

    modelselect:ModelSelect = null

    ngOnInit(): void {
        this.select.addselectallparametrs(new ModelSelect(1)).subscribe(model=>{
          alert(model);
        })              
  
    }
}