import { Component } from '@angular/core';
import { NewModelDynamicTableColumnModel } from '../../AddFullModel/ModelTable/DynamicTableModel';
import { PostInventar } from '../../../Post RequestService/PostRequest';
import { GenerateParametrs } from '../../AllSelectModel/GenerateParametrFront';
import { ModelFileDetals } from '../../ModelInventory/InventoryModel';
import { SelectionModel } from '@angular/cdk/collections';
//import { shell} from "electron"

@Component(({
    selector: 'FileServer',
    templateUrl: '../Html/FileServer.html',
    styleUrls: ['../Html/FileServer.css']
}) as any)

export class FileServer {
    constructor(public selectall: PostInventar) { }


    public dinamicmodel: NewModelDynamicTableColumnModel = new NewModelDynamicTableColumnModel();
    public selectionRowModel = new SelectionModel<any>(false, []);
    public selectingView: GenerateParametrs;
    public modelFileDetals: ModelFileDetals;


    public selectModelAksiok() {
        if (this.selectionRowModel.selected.length === 1) {
            this.selectall.downLoadFileDetal(this.selectionRowModel.selected[0].IdFile).subscribe((model: ModelFileDetals) => {
                this.modelFileDetals = model;
            });
        }
    }

    public viewFile(row: any) {
        console.log(row.PathFile);
        if (row.PathFile) {
            console.log(row.PathFile);
            //alert("Болт")
            // shell.openPath(row.PathFile);

        }
        else {
            alert("Путь к файлу должен быть в заголовке!!!")
        }
    }

    public downloadFile(row: any) {
        if (row.SizeFile <= 5000000 && row.SizeFile !== 0) {
            if (row.IdFile) {
                this.selectall.downloadFileServer(row.IdFile);
            }
            else {
                alert("Ун файла должен быть в заголовке!!!")
            }
        }
        else {
            alert("Размер файла не должен превышать 500 Mb и не быть 0 Mb!!!")
        }
    }

    public async downloadServer() {
        await this.selectall.downLoadXlsxSql(this.selectingView.generatecommand())
    }



    public onChangedReturnSelect(selecting: GenerateParametrs) {
        this.selectingView = selecting;
        this.selectionRowModel.clear();
    }

}