import { Component } from '@angular/core';

import { NewModelDynamicTableColumnModel } from '../../AddFullModel/ModelTable/DynamicTableModel';
import { PostInventar } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs } from '../../AllSelectModel/GenerateParametrFront';


@Component(({
    selector: 'FileServer',
    templateUrl: '../Html/FileServer.html',
    styleUrls: ['../Html/FileServer.css'],
}) as any)

export class FileServer {
    constructor(public selectall: PostInventar) { }

    public dinamicmodel: NewModelDynamicTableColumnModel = new NewModelDynamicTableColumnModel();

    public selectingView: GenerateParametrs;


    public async downloadServer() {
        await this.selectall.downLoadXlsxSql(this.selectingView.generatecommand())
    }

    public viewFile(row: any) {
        console.log(row);
        if(row.PathFile){
     
            window.open(row.PathFile);
           
        }
        else{
            alert("Отсутствует путь к файлу!!!")
        }
        
    }

    public downloadFile(row: any) {
        console.log(row);
    }



    public onChangedReturnSelect(selecting: GenerateParametrs) {
        this.selectingView = selecting;
    }

}