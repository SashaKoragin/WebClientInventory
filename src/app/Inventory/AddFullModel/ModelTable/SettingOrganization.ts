import { EditAndAdd, AuthIdentificationSignalR } from '../../../Post RequestService/PostRequest';
import { BroadcastEventListener } from 'ng2-signalr';
import { Organization, ModelReturn, FullSelectedModel } from '../../ModelInventory/InventoryModel';
import { ConvertDate } from '../../AddFunctionConvertDate/ConvertDateModel';

export class MainSettingOrganization {

    constructor(public editandadd: EditAndAdd, public SignalR: AuthIdentificationSignalR) {
        this.subscribeservers();
    }

    public convert: ConvertDate = new ConvertDate();
    public dataSource: Organization = new Organization();
    isEdit: boolean = true;
    modelCancelError: Organization = new Organization();

    //Подписка на обновление настроек
    public subscribeAddAndUpdate: any = null;

    public subscribeservers() {
        this.subscribeAddAndUpdate = new BroadcastEventListener<Organization>('SubscribeOrganization');
        this.SignalR.conect.listen(this.subscribeAddAndUpdate);
        this.subscribeAddAndUpdate.subscribe((substring: Organization) => {
            this.isEdit = true;
            this.dataSource = substring;
        });
    }

    public edit(): void {
        this.isEdit = false;
        this.modelCancelError = JSON.parse(JSON.stringify(this.dataSource))
    }

    public save(): void {
        this.editandadd.addandeditorganization(this.convert.convertDateToServer<Organization>(this.dataSource), this.SignalR.iduser).toPromise().then((model: ModelReturn<Organization>) => {
            if (model.Model === null) {
                alert(model.Message)
                this.cancel();
            }
        });
        //Запрос на сохранение и обновление данных
    }

    ///Отмена редактирования
    public cancel(): void {
        this.isEdit = true;
        this.dataSource = this.modelCancelError;
    }

    public async addtableModel(model: FullSelectedModel) {
        this.dataSource = model.Organization;
        return "Модель настроек организации заполнена";
    }
}