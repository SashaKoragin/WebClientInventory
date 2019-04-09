import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class ModelInventar {
    public otdelfunc: string;
    public children: ModelInventar[];
    public types: string;
    public pages: string;
    public fullpath: string;
    public model: string;
}

@Injectable()
export class Inventar {
    dataChange = new BehaviorSubject<ModelInventar[]>([{
        otdelfunc: 'Инвентаризация',
        children: [{
            otdelfunc: 'Пользователи',
            children: null, types: 'Все пользователи', pages: './users', fullpath: 'Пользователи\\Все пользователи', model: 'Все пользователи'
        },
        {
            otdelfunc: 'Техника',
            children: null, types: 'Вся техника', pages: './techical', fullpath: 'Техника\\Вся техника', model: 'Вся техника'
        },
        {
            otdelfunc: 'Общая',
            children: null, types: 'Общая инвентаризация', pages: './inventar', fullpath: 'Общая\\Общая инвентаризация', model: 'Инвентаризация'
        }], types: null, pages: null, fullpath: null, model: null
    }]);
}