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
            children: [{
                otdelfunc: null,
                children: null, types: 'Все пользователи', pages: './users', fullpath: 'Пользователи\\Все пользователи', model: 'Все пользователи'
            }], types: null, pages: null, fullpath: null, model: null
        },
        {
            
            otdelfunc: 'Техника',
            children:  [{
                otdelfunc: null,
                children: null, types: 'Вся техника', pages: './techical', fullpath: 'Техника\\Вся техника', model: 'Вся техника'
            },
            {
                otdelfunc: null,
                children: null, types: 'Дополнительная к технике', pages: './techicalComplement', fullpath: 'Техника\\Дополнительная к технике', model: 'Дополнительная к технике'
            }
        ], types: null, pages: null, fullpath: null, model: null
        },
        {
            otdelfunc: 'Статистика',
            children:  [{
                otdelfunc: null,
                children: null, types: 'Общая инвентаризация', pages: './inventar', fullpath: 'Статистика\\Общая инвентаризация', model: 'Инвентаризация'
            }], types: null, pages: null, fullpath: null, model: null
        },
        {
            otdelfunc: 'Документы',
            children:  [{
                otdelfunc: null,
                children: null, types: 'Документы', pages: './documents', fullpath: 'Документы\\Документы', model: 'Документы'
            }], types: null, pages: null, fullpath: null, model: null
        },
        {
            otdelfunc: 'Аналитика',
            children:  [{
                otdelfunc: null,
                children: null, types: 'Аналитика', pages: './analitics', fullpath: 'Аналитика\\Аналитика', model: 'Аналитика'
            }], types: null, pages: null, fullpath: null, model: null
        },
        {
            otdelfunc: 'Ошибки',
            children:  [{
                otdelfunc: null,
                children: null, types: 'Ошибки', pages: './error', fullpath: 'Ошибки\\Ошибки', model: 'Ошибки'
            }], types: null, pages: null, fullpath: null, model: null
        },  
    ], types: null, pages: null, fullpath: null, model: null
    }]);
}

