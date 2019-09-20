import { Component,Input,ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import { SelectAllParametrs } from '../../../../Post RequestService/PostRequest';
import { AddFile } from '../../../AddFullModel/ModelTable/FileModel';
@Component(({
    selector: 'uploadsfile',
    templateUrl: '../Html/Upload.html',
    styleUrls: ['../Html/Upload.css'],
    providers: [SelectAllParametrs]
}) as any)


export class UploadsFile implements AfterViewInit{

    constructor(public select:SelectAllParametrs) {}

     @ViewChild('myInput',{static: false,read:ElementRef}) ref: ElementRef;
     addfile:AddFile
     @Input() ClassFile:string;  ///Для разбора на сервере классификация файла

     ngAfterViewInit() {
        this.addfile = new AddFile(this.select,this.ref);
      }
}