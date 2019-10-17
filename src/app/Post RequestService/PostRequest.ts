import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, Autorization, Printer, Kabinet, 
         ScanerAndCamer, Mfu, SysBlock, Monitor,
         BlockPower, UsersIsActualsStats, Classification,
         FullSelectedModel, NameMonitor, FullProizvoditel, Statusing, 
         FullModel, CopySave, NameSysBlock, Otdel,Position,
         Telephon,Supply,ModelBlockPower,ProizvoditelBlockPower } from '../Inventory/ModelInventory/InventoryModel';
import { AdressInventarka } from '../AdressGetPost/AdressInventory';
import { deserializeArray } from 'class-transformer';
import { ModelSelect, LogicaSelect } from '../Inventory/AllSelectModel/ParametrModel';
import { DocumentReport } from '../Inventory/AllSelectModel/Report/ReportModel';
import { UploadFile } from '../Inventory/AddFullModel/ModelTable/FileModel';
import { BookModels } from '../Inventory/ModelInventory/ViewInventory';


const url: AdressInventarka = new AdressInventarka();
const httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
@Injectable({
    providedIn: 'root'
})
export class AuthIdentification {

    constructor(private http: HttpClient) { }

    fullSelect: Autorization;
    user:Users = new Users();
    error:string;

    logins:string = null;
    password: string = null;


    isLoggedIn = false;
    redirectUrl: string;

    login() {
        this.error = null;
        this.user.Passwords = this.password;
        this.user.NameUser = this.logins;
        return this.http.post(url.autificationInventar, this.user, httpOptionsJson);
    }

    logout(): void {
        this.isLoggedIn = false;
        this.user = new Users();
        this.error = null;
    }
}

@Injectable({
    providedIn: 'root'
})
export class PostInventar {
    constructor(private http: HttpClient) { }
 
    public select: FullSelectedModel = new FullSelectedModel();
    ///Актулизация пользователей в БД
    actualusersmodel(){
        return this.http.post(url.actualstatusModel,null,httpOptionsJson);
    }
    //Актулизация Ip Адресов Компьютеров
    actualIpComputers(){
        return this.http.post(url.actualIpAdresComputers,null,httpOptionsJson);
    }
    //Генерация справочника инспекции
    telephonehelp(model:ModelSelect){
        return this.http.post(url.telephoneHelper,model,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }
    
    ///Выборка всего из БД в всех пользователей
    async alluser() {
    this.select.Users = await this.http.get(url.alluser, httpOptionsJson).toPromise().then((model)=>{
            if(model){
                return  deserializeArray<Users>(Users,model.toString());
            }
         });
    }
    //Вытащить все отделы из БД
    async allotdel(){
    this.select.Otdels = await this.http.get(url.allotdelget,httpOptionsJson).toPromise().then((model)=>{
            if(model){
                return deserializeArray<Otdel>(Otdel,model.toString());
            }
         });
    }
    //Вытащить все должностя из БД
    async allposition(){
     this.select.Position = await this.http.get(url.allposition,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Position>(Position,model.toString());
            }
         });
    }
    //Запрос на все принтера
    async allprinters(){
        this.select.Printer = await this.http.get(url.allprinters,httpOptionsJson).toPromise().then(model=>{
            if(model){
                 return deserializeArray<Printer>(Printer,model.toString())
               }
         });
    }
    //Запрос на все сканеры
    async allscaners(){
        this.select.Scaner = await this.http.get(url.allscaners,httpOptionsJson).toPromise().then(model=>{
            if(model){
                 return deserializeArray<ScanerAndCamer>(ScanerAndCamer,model.toString())
               }
         });;
    }
    //Запрос на все мфу
    async allmfu(){
        this.select.Mfu = await this.http.get(url.allmfu,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Mfu>(Mfu,model.toString())
               }
         });
    }

    //Запрос на все системные блоки
    async allsysblok(){
        this.select.SysBlok = await this.http.get(url.allsysblock,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<SysBlock>(SysBlock,model.toString())
               }
         });;
    }
    //Получить всю класификацию
    async allclassification(){
        this.select.Classification =await this.http.get(url.allclasification,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Classification>(Classification,model.toString());
            }
        })
    }

    //Запрос на все мониторы
    async allmonitor(){
        this.select.Monitors =await this.http.get(url.allmonitor,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Monitor>(Monitor,model.toString())
               }
         });
    }
    //Запрос на все copySave
    async allcopysave(){
        this.select.CopySave =await this.http.get(url.allcopysave,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<CopySave>(CopySave,model.toString());
             }
         });
    }
    //Запрос на все производители принтеров
    async allproizvoditel(){
        this.select.Proizvoditel = await this.http.get(url.allproizvoditel,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<FullProizvoditel>(FullProizvoditel,model.toString());
             }
         });
    }
    //Запрос на все модели принтеров
    async allmodel(){
        this.select.Model = await this.http.get(url.allmodel,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<FullModel>(FullModel,model.toString());
             }
         });
    }
    //Запрос на все кабинеты
    async allkabinet(){
        this.select.Kabinet = await this.http.get(url.allkabinet,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<Kabinet>(Kabinet,model.toString());
             }
         });
    }
    //Запрос на все статусы
    async allstatysing(){
        this.select.Statusing = await this.http.get(url.allstatusing,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<Statusing>(Statusing,model.toString());
             }
         });
    }
    //Запрос на все модели системных блоков
    async allnamesysblok(){
        this.select.ModelSysBlok = await this.http.get(url.allnamesysblok,httpOptionsJson).toPromise().then(model=>{
            if(model){
              return deserializeArray<NameSysBlock>(NameSysBlock,model.toString());
             }
         });;
    }
    //Запрос на все модели мониторов
    async allnamemonitor(){
        this.select.NameMonitors = await this.http.get(url.allnamemonitor,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<NameMonitor>(NameMonitor,model.toString())
               }
         });
    }  
    async alltelephone(){
        this.select.Telephon = await this.http.get(url.alltelephon,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Telephon>(Telephon,model.toString())
               }
         });
    }

    async allblockpower(){
        this.select.BlockPower = await this.http.get(url.allblockpower,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<BlockPower>(BlockPower,model.toString())
               }
         });
    }
    async allsupply(){
        this.select.Supply = await this.http.get(url.allsupply,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<Supply>(Supply,model.toString())
               }
         });
    }

    async allmodelblockpower(){
        this.select.ModelBlockPower = await this.http.get(url.allmodelblockpower,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<ModelBlockPower>(ModelBlockPower,model.toString())
               }
         });
    }
    //Статистика процедуры
    async allstatisticsusers(){
        this.select.UsersIsActualsStats = await this.http.get(url.allstatistics,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<UsersIsActualsStats>(UsersIsActualsStats,model.toString())
            }
        })
    }

    async allproizvoditelblockpower(){
        this.select.ProizvoditelBlockPower = await this.http.get(url.allproizvoditelblockpower,httpOptionsJson).toPromise().then(model=>{
            if(model){
                return deserializeArray<ProizvoditelBlockPower>(ProizvoditelBlockPower,model.toString())
               }
         });
    }




 ///Все запросы для заполнение данных по пользователю
 public async fullusers(){

       await this.alluser();
       await this.allposition();
       await this.allotdel();
       await this.alltelephone();
       await this.allstatisticsusers();
       await this.allkabinet();
       await this.allstatysing();
       await this.allsupply();
    }

}

@Injectable()
export class EditAndAdd{
    constructor(private http: HttpClient) { }
     ///Обновление или добавление Users
    addandedituser(user:Users){
        return this.http.post(url.addandedituser, user, httpOptionsJson);
    }    
    ///Добабление или обновление принтеров
    addandeditprinter(printer:Printer){
        return this.http.post(url.addandeditprinter, printer, httpOptionsJson);
    }    
    ///Добабление или обновление сканера
    addandeditscaner(scaner:ScanerAndCamer){
        return this.http.post(url.addandeditscaner, scaner, httpOptionsJson);
    }  
    ///Добабление или обновление мфу
    addandeditmfu(mfu:Mfu){
        return this.http.post(url.addandeditmfu, mfu, httpOptionsJson);
    }     
    ///Добабление или обновление системного блока
    addandeditsysblok(sysblock:SysBlock){
        return this.http.post(url.addandeditsysblock, sysblock, httpOptionsJson);
    }     
    ///Добабление или обновление монитора
    addandeditmonitor(monutor:Monitor){
        return this.http.post(url.addandeditmonitor, monutor, httpOptionsJson);
    }     
    ///Редактирование или добавление отдела
    addandeditotdel(otdel:Otdel){
        return this.http.post(url.addandeditotdel,otdel,httpOptionsJson);
    }
    ///Редактирование или добавление телефонов
    addandedittelephon(telephon:Telephon){
        return this.http.post(url.addandedittelephon,telephon,httpOptionsJson);
    }
    ///Редактирование или добавление ИБП
    addandeditblockpower(blockpower:BlockPower){
        return this.http.post(url.addandeditblockpower,blockpower,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование системного блока
    addAndEditNameSysBlock(nameSysBlock:NameSysBlock){
        return this.http.post(url.addAndEditNameSysBlock,nameSysBlock,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование монитора
    addAndEditNameMonitor(nameMonitor:NameMonitor){
        return this.http.post(url.addAndEditNameMonitor,nameMonitor,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование модели ИБП
    addAndEditNameModelBlokPower(nameModelBlokPower:ModelBlockPower){
        return this.http.post(url.addAndEditNameModelBlokPower,nameModelBlokPower,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование производителя ИБП
    addAndEditNameProizvoditelBlockPower(nameProizvoditelBlockPower:ProizvoditelBlockPower){
        return this.http.post(url.addAndEditNameProizvoditelBlockPower,nameProizvoditelBlockPower,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование партии
    addAndEditNameSupply(nameSupply:Supply){
        return this.http.post(url.addAndEditNameSupply,nameSupply,httpOptionsJson);
    }
    ///Редактирование или добавление Наименование статуса
    addAndEditNameStatus(nameStatusing:Statusing){
        return this.http.post(url.addAndEditNameStatus,nameStatusing,httpOptionsJson);
    }
    ///Редактирование или добавление Номера кабинета
    addAndEditNameKabinet(nameKabinet:Kabinet){
        return this.http.post(url.addAndEditNameKabinet,nameKabinet,httpOptionsJson);
    }
    ///Редактирование или добавление модели принтера (МФУ)
    addAndEditNameFullModel(nameFullModel:FullModel){
        return this.http.post(url.addAndEditNameFullModel,nameFullModel,httpOptionsJson);
    }
    ///Редактирование или добавление классификации принтера (МФУ)
    addAndEditNameClassification(nameClassification:Classification){
        return this.http.post(url.addAndEditNameClassification,nameClassification,httpOptionsJson);
    }
    ///Редактирование или добавление производителя принтера (МФУ)
    addAndEditNameFullProizvoditel(nameFullProizvoditel:FullProizvoditel){
        return this.http.post(url.addAndEditNameFullProizvoditel,nameFullProizvoditel,httpOptionsJson);
    }
    ///Редактирование или добавление CopySave
    addAndEditNameCopySave(nameCopySave:CopySave){
        return this.http.post(url.addAndEditNameCopySave,nameCopySave,httpOptionsJson);
    }
}
@Injectable()
export class SelectAllParametrs{
    constructor(private http: HttpClient) { }
    

   addselectallparametrs(model:ModelSelect){
        return this.http.post(url.selectparametr,model,httpOptionsJson);
    }

    selectusersql(model:LogicaSelect){
        return this.http.post(url.selectxml,model,httpOptionsJson);
    }

   public deletedocument(iddocument:number){
       return this.http.post(url.deletedocument,iddocument,httpOptionsJson)
   }

   public selectdocument(iddocument:number){
    return this.http.post(url.selectdocument,iddocument,
        { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
   }

   public selectbook(idbook:number){
    return this.http.post(url.selectbook,idbook,
        { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
   }

   public generatebook(bookModels:BookModels ){
    return this.http.post(url.bookModels,bookModels,
        { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
   }

   public generatedocument(modeldoc:DocumentReport){
        return this.http.post(url.generatedocument,modeldoc,
            { responseType: 'arraybuffer', headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    public addfiledb(upload:UploadFile){
        return this.http.post(url.addfiledb,upload,httpOptionsJson);
    }
      //arraybuffer,blob
}
