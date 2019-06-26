import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, Autorization, Printer, Kabinet, ModelReturn, ScanerAndCamer, Mfu, SysBlock, Monitor,
    FullSelectedModel, NameMonitor, FullProizvoditel, Statusing, FullModel, CopySave, NameSysBlock, Otdel,Position  } from '../Inventory/ModelInventory/InventoryModel';
import { AdressInventarka } from '../AdressGetPost/AdressInventory';
import { ModelParametr } from '../Inventory/ModelInventory/Parametr';
import { deserializeArray } from 'class-transformer';
import { ModelSelect, LogicaSelect } from '../Inventory/AllSelectModel/ParametrModel';

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

    ///Выборка всего из БД в зависимостb от num пользователи
    alluser() {
        return this.http.get(url.alluser, httpOptionsJson);
    }
    //Вытащить все отделы из БД
    allotdel(){
        return this.http.get(url.allotdelget,httpOptionsJson);
    }
    //Вытащить все должностя из БД
    allposition(){
        return this.http.get(url.allposition,httpOptionsJson);

    }
    //Запрос на все принтера
    allprinters(){
        return this.http.get(url.allprinters,httpOptionsJson);
    }
    //Запрос на все сканеры
    allscaners(){
        return this.http.get(url.allscaners,httpOptionsJson);
    }

    //Запрос на все мфу
    allmfu(){
        return this.http.get(url.allmfu,httpOptionsJson);
    }

    //Запрос на все системные блоки
    allsysblok(){
        return this.http.get(url.allsysblock,httpOptionsJson);
    }

    //Запрос на все мониторы
    allmonitor(){
        return this.http.get(url.allmonitor,httpOptionsJson);
    }
    //Запрос на все copySave
    allcopysave(){
        return this.http.get(url.allcopysave,httpOptionsJson);
    }
    //Запрос на все производители принтеров
    allproizvoditel(){
        return this.http.get(url.allproizvoditel,httpOptionsJson);
    }
    //Запрос на все модели принтеров
    allmodel(){
        return this.http.get(url.allmodel,httpOptionsJson);
    }
    //Запрос на все кабинеты
    allkabinet(){
        return this.http.get(url.allkabinet,httpOptionsJson);
    }
    //Запрос на все статусы
    allstatysing(){
        return this.http.get(url.allstatusing,httpOptionsJson);
    }
    //Запрос на все модели системных блоков
    allnamesysblok(){
        return this.http.get(url.allnamesysblok,httpOptionsJson);
    }
    //Запрос на все модели мониторов
    allnamemonitor(){
        return this.http.get(url.allnamemonitor,httpOptionsJson);
    }

    public select: FullSelectedModel = new FullSelectedModel();

 ///Все запросы для заполнение данных
    fullreqvests(){
       try {
        this.allotdel().subscribe((model)=>{
            if(model){
                this.select.Otdels = deserializeArray<Otdel>(Otdel,model.toString());
            }
        });
        this.allposition().subscribe((model)=>{
            if (model) {
                this.select.Position =  deserializeArray<Position>(Position,model.toString());
            }
        });
        this.alluser().subscribe((model)=> {
            if (model) {
                
                this.select.Users =  deserializeArray<Users>(Users,model.toString());
            }});
        this.allnamemonitor().subscribe((model)=>{
            if(model){
                this.select.NameMonitors = deserializeArray<NameMonitor>(NameMonitor,model.toString())
               }
           });
             this.allcopysave().subscribe((model)=>{
              if(model){
                this.select.CopySave = deserializeArray<CopySave>(CopySave,model.toString());
               }
             });
             this.allkabinet().subscribe((model)=>{
              if(model){
                this.select.Kabinet = deserializeArray<Kabinet>(Kabinet,model.toString());
               }
             });
             this.allmodel().subscribe((model)=>{
              if(model){
                this.select.Model = deserializeArray<FullModel>(FullModel,model.toString());
               }
             });
             this.allnamesysblok().subscribe((model)=>{
              if(model){
                this.select.ModelSysBlok = deserializeArray<NameSysBlock>(NameSysBlock,model.toString());
               }
             });
             this.allstatysing().subscribe((model)=>{
              if(model){
                this.select.Statusing = deserializeArray<Statusing>(Statusing,model.toString());
               }
             });
             this.allproizvoditel().subscribe((model)=>{
              if(model){
                this.select.Proizvoditel = deserializeArray<FullProizvoditel>(FullProizvoditel,model.toString());
               }
             });
             this.allprinters().subscribe((model)=>{
              if(model){
                  this.select.Printer = deserializeArray<Printer>(Printer,model.toString())
                 }
             });
            this.allscaners().subscribe((model)=>{
              if(model){
                  this.select.Scaner = deserializeArray<ScanerAndCamer>(ScanerAndCamer,model.toString())
                 }
             });
            this.allmfu().subscribe((model)=>{
              if(model){
                  this.select.Mfu = deserializeArray<Mfu>(Mfu,model.toString())
                 }
             });
             this.allsysblok().subscribe((model)=>{
              if(model){
                  this.select.SysBlok = deserializeArray<SysBlock>(SysBlock,model.toString())
                 }
             });
             this.allmonitor().subscribe((model)=>{
              if(model){
                  this.select.Monitors = deserializeArray<Monitor>(Monitor,model.toString())
                 }
             });
       } catch (error) {
           console.log(error);
       }
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
        return this.http.post(url.addandeditotdel,otdel,httpOptionsJson)
    }
}
@Injectable()
export class SelectAllParametrs{
    constructor(private http: HttpClient) { }
    
    addselectallparametrs(model:ModelSelect){
        return this.http.post(url.selectparametr,model,httpOptionsJson)
    }

    selectusersql(model:LogicaSelect){
        return this.http.post(url.selectxml,model,httpOptionsJson)
    }
      
}
