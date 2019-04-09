import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, FullSelected } from '../Inventory/ModelInventory/InventoryModel';
import { AdressInventarka } from '../AdressGetPost/AdressInventory';
import { ModelParametr } from '../Inventory/ModelInventory/Parametr';

const url: AdressInventarka = new AdressInventarka();
const httpOptionsJson = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
@Injectable({
    providedIn: 'root'
})
export class AuthIdentification {

    constructor(private http: HttpClient) { }

    fullSelect: FullSelected;
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

@Injectable()
export class PostInventar {
    constructor(private http: HttpClient) { }

    ///Выборка всего из БД в зависимостb от num пользователи
    alluser(num:number) {
        return this.http.post(url.alluser, new ModelParametr(num), httpOptionsJson);
    }
}

