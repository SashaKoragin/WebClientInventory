import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class ModelInventar {
    public otdelfunc: string;
    public isrule: string[]
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
                children: null, types: 'Все пользователи', pages: './users', fullpath: 'Пользователи\\Все пользователи', model: 'Все пользователи', isrule: null
            },
            {
                otdelfunc: null,
                children: null, types: 'Ветки в АИС 3', pages: './pathAis3', fullpath: 'Пользователи\\Ветки в АИС 3', model: 'Ветки в АИС 3', isrule: null
            }
            ], types: null, pages: null, fullpath: null, model: null, isrule: null
        },
        {

            otdelfunc: 'Техника',
            children: [{
                otdelfunc: null,
                children: null, types: 'Вся техника', pages: './techical', fullpath: 'Техника\\Вся техника', model: 'Вся техника', isrule: null
            },
            {
                otdelfunc: null,
                children: null, types: 'Токены и прочее', pages: './supportToken', fullpath: 'Техника\\Токены и прочее', model: 'Токены и прочее', isrule: null
            },
            {
                otdelfunc: null,
                children: null, types: 'Дополнительная к технике', pages: './techicalComplement', fullpath: 'Техника\\Дополнительная к технике', model: 'Дополнительная к технике', isrule: ['Просмотр']
            }
            ], types: null, pages: null, fullpath: null, model: null, isrule: null
        },
        {
            otdelfunc: 'Почта и ВКС',
            children: [{
                otdelfunc: null,
                children: null, types: 'Письма Nalog и ВКС', pages: './mail', fullpath: 'Почта\\Письма Nalog и ВКС', model: 'Письма Nalog и ВКС', isrule: null
            },
            {
                otdelfunc: null,
                children: null, types: 'Пользователи и группы', pages: './userandgroup', fullpath: 'Статистика\\Пользователи и группы', model: 'Статистика', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        },
        {
            otdelfunc: 'Статистика',
            children: [{
                otdelfunc: null,
                children: null, types: 'Статистика', pages: './inventar', fullpath: 'Статистика\\Статистика', model: 'Статистика', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: null
        },
        {
            otdelfunc: 'Документы',
            children: [{
                otdelfunc: null,
                children: null, types: 'Накладные', pages: './documents', fullpath: 'Документы\\Накладные', model: 'Накладные', isrule: null
            },
            {
                otdelfunc: null,
                children: null, types: 'Книга учета', pages: './book', fullpath: 'Документы\\Книга учета', model: 'Книга учета', isrule: null
            }
            ], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        },
        {
            otdelfunc: 'Аналитика',
            children: [{
                otdelfunc: null,
                children: null, types: 'Аналитика', pages: './analitics', fullpath: 'Аналитика\\Аналитика', model: 'Аналитика', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        },
        {
            otdelfunc: 'Процессы',
            children: [{
                otdelfunc: null,
                children: null, types: 'Синхронизация', pages: './process', fullpath: 'Процессы\\Синхронизация', model: 'Синхронизация', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        },
        {
            otdelfunc: 'Ошибки',
            children: [{
                otdelfunc: null,
                children: null, types: 'Ошибки', pages: './error', fullpath: 'Ошибки\\Ошибки', model: 'Ошибки', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        },
        {
            otdelfunc: 'Журнал',
            children: [{
                otdelfunc: null,
                children: null, types: 'Журнал изменений', pages: './log', fullpath: 'Журнал\\Журнал изменений', model: 'Журнал изменений', isrule: null
            }], types: null, pages: null, fullpath: null, model: null, isrule: ['Просмотр']
        }

        ], types: null, pages: null, fullpath: null, model: null, isrule: null
    }]);
}

