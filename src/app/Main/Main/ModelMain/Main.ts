import { Component } from '@angular/core';
import * as images from '../../../Images/ImageConst';
import 'signalr/jquery.signalR.js';
const img = images;  //Для WebPack
@Component({
    selector: 'app-root',
    templateUrl: '../Html/Main.html',
    styleUrls: ['../Html/Main.css']
})
export class Root {
    constructor() {}
}