import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectAllParametrs, AuthIdentificationSignalR, AuthIdentification } from '../../../../Post RequestService/PostRequest';
import { BroadcastEventListener } from 'ng2-signalr';
import { ModeleReturn, AksiokAllModel, AllCharacteristics } from '../../../ModelInventory/InventoryModel';
import { DynamicTableColumnModel, Table } from '../../../AddFullModel/ModelTable/DynamicTableModel';
import { LogicaDataBase, GenerateParametrs } from '../../../AllSelectModel/GenerateParametrFront';
import { ModelSelect } from '../../../AllSelectModel/ParametrModel';
import { SelectionModel } from '@angular/cdk/collections';
import { Select } from '../../../AddFullModel/ModelViewSelect/View/SelectView';


@Component(({
    selector: 'aksiok',
    templateUrl: '../Html/Aksiok.html',
    styleUrls: ['../Html/Aksiok.css'],
    providers: [SelectAllParametrs]
}) as any)


export class Aksiok implements OnInit {
    constructor(public select: SelectAllParametrs, public SignalR: AuthIdentificationSignalR, public authService: AuthIdentification,) { }

    @ViewChild('Aksiok', { static: false }) selectionChildAksiok: Select;
    dinamicmodel: DynamicTableColumnModel = new DynamicTableColumnModel();
    logica: LogicaDataBase = new LogicaDataBase();
    selecting: GenerateParametrs;
    columns: Table = this.dinamicmodel.equipmentStoAll[1];


    selectionRowModel = new SelectionModel<AksiokAllModel>(false, []);
    valueAttribute: AllCharacteristics = new AllCharacteristics();
    //Подписка на статус процесса
    public subscribeStatusProcess: any = null;
    public statusProcessInfo: string = null;

    ngOnInit(): void {
        this.errorServer();
        this.subscribeServers();
    }

    errorServer() {
        this.select.addselectallparametrs(new ModelSelect(this.dinamicmodel.mainEquipmentSto[1].indexsevr)).subscribe((model: ModelSelect) => {
            this.selecting = new GenerateParametrs(model);
        })
    }


    public subscribeServers() {
        this.subscribeStatusProcess = new BroadcastEventListener<string>('SubscribeStatusProcess');
        this.SignalR.conect.listen(this.subscribeStatusProcess);
        this.subscribeStatusProcess.subscribe((statusProcess: ModeleReturn<string>) => {
            this.statusProcessInfo = statusProcess.Message;
        });

    }

    selectModelAksiok() {
        if (this.selectionRowModel.selected.length === 1) {
            this.select.selectModelCharacteristicJson(this.selectionRowModel.selected[0].Id).then((model: any) => {
                this.valueAttribute.AksiokAllModel = this.selectionRowModel.selected[0];
                this.valueAttribute.ValueCharacteristicJson = [];
                for (var property in model) {
                    var array = model[property].split(':');
                    if (parseInt(array[1]) !== 0) {
                        this.valueAttribute.ValueCharacteristicJson.push({ Text: array[0], Index: parseInt(array[1]), Value: array[2] });
                    }
                }
            })
        }
        else {
            this.valueAttribute = new AllCharacteristics();
        }
    }

    ///Запуск процесса актуализации АКСИОК
    synchronization() {
        this.select.startPocessUpdateAksiok(this.authService.autorization.loginField, this.authService.autorization.passwordField);
    }

    ///Событие назад из дочернего компонента)))
    isBackBoolean(back: boolean) {
        if (back) {
            this.valueAttribute = new AllCharacteristics();
        }
    }

}
