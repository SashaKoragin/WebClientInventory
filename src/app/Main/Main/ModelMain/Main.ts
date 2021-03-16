import { Component, Pipe, PipeTransform } from '@angular/core';
import * as images from '../../../Images/ImageConst';
import 'signalr/jquery.signalR.js';
const img = images;  //Для WebPack

@Pipe({
    name: 'filters'
})
export class FilterParametrs implements PipeTransform {
    public transform(value: any[], keys: number[]) {
        return  value.filter(item=>keys.indexOf(item.IdCategiria)!==-1); 
    }
}


@Component({
    selector: 'app-root',
    templateUrl: '../Html/Main.html',
    styleUrls: ['../Html/Main.css']
})
export class Root {
    constructor() {}
}