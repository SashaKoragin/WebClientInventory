import { FormControl,ValidatorFn, AbstractControl } from '@angular/forms';
import { ModelSelect, LogicaSelect } from './ParametrModel';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { DatePipe } from '@angular/common';
import { Table } from '../AddFullModel/ModelTable/DynamicTableModel';

export const moment = _rollupMoment || _moment;

//Сам написал проверка на регулярное выражение аналогичные проверки пишатся так-же
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? null : { 'forbiddenName': { value: control.value } };
    };
}

export function validatorDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return control.value < new Date() ? null : { 'DateError': { value: control.value } }
    };
}
//Класс выборки
class SelectCompanent {
    //Значение
    value: string;
    //View графика
    viewValue: string;
    //Номер для подстановки знака
    num: number;
}
//Клас полей значений для проверки Validation
export class FormSelect {
    public  numberPole = new FormControl('', [forbiddenNameValidator(/^((\d{1,10}\/{1})+(\d{1,10})|(\d{0,10})|(^$))$/)]);
    public  stringPole = new FormControl();
    public  datePole = new FormControl('', [forbiddenNameValidator(/^((((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))\/{1})+((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))|((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))|(^$))$/)]);
    public  elementRefPole = new FormControl();}
//Параметры создания на вместе с подстановкой
export class SelectParam {
    //Наименование параметра
    name: string;
    //Сам параметр в выборке
    nameparametr: string;
    //Сам текст параметра
    paramvalue: string;
    //Выборка для генерации
    select: SelectCompanent;
    //Отражать ли элемент в выборке или нет
    isvisible: boolean;
    //Ун шаблона для создания типов в ковычках или без true с кавычками false без кавычек
    numеrtemplate: boolean;
    //Шаблон 1-Дата, 2-Текст, 3-Числа :Числа и дата это 1 шаблон только даты генерятся по другому и с кавычками методу
    template: number;
    //Форма шаблона
    formTemplate: FormControl;
}


export class LogicaDataBase{
    ///Индекс вкладки
    indextab:number;
    //Select выборка
    select: boolean = true;
    progress: boolean = true;
    date: boolean = true;
    
    //Ошибка если нет данных
    errornull: boolean = true;

    public default(){
        this.select= true;
        this.progress = true;
        this.date = true;
        this.errornull = true;
    }
    
    //Переключение выборки select
    public logicaselect() {
        if (this.select) {
            this.select = false;
        } else {
            this.select = true;
        }
    }

    //Переключение выборки progress
   public logicaprogress() {
        if (this.progress) {
            this.progress = false;
        } else {
            this.progress = true;
        }
    }
    //Логика данных 
   public logicadatabase(){
    if (this.date) {
        this.date = false;
    } else {
        this.date = true;
    }
   }
}

export class GenerateParametrs{
    constructor(public model:ModelSelect){
        this.parametrs = this.generateparametrs(model);
        this.selectedtoserver = model.logicaSelectField;
     }


     public parametrs:SelectParam[];
     public selectedtoserver: LogicaSelect;

    //Проверка Валидации всего блока при нажатии Обновить
    public errorModel():boolean {
        for (var sel of this.parametrs) {
            if (sel.select !== null && sel.select.num !== 0) {
                if (sel.formTemplate.invalid) {
                    return false;
                }
            }
        }
       return true;
   }



  private generateparametrs(modelselect:ModelSelect):SelectParam[]{
        var parametrs:SelectParam[] = [];
       for (const param of modelselect.parametrsField) {
        var newparam:SelectParam = new SelectParam()
            newparam.name = param.valueField;
            newparam.nameparametr = param.infoField;
            newparam.paramvalue = '';
            newparam.isvisible = param.isVisibleField;
            newparam.select = null;
            if(param.typeColumnField == 'elementRef')
            {
                newparam.template = 4;
                newparam.formTemplate = new FormSelect().elementRefPole;
            }
            else{
              if(param.typeColumnField == 'varchar' || param.typeColumnField == 'smalldatetime'){
                newparam.numеrtemplate = true;
                if(param.typeColumnField == 'varchar')
                {
                    newparam.template = 2;
                    newparam.formTemplate = new FormSelect().stringPole;
                }
                if(param.typeColumnField == 'smalldatetime')
                {
                    newparam.template = 1;
                    newparam.formTemplate = new FormSelect().datePole;
                }
              }
              else{
                newparam.numеrtemplate = false;
                newparam.template = 3;
                newparam.formTemplate = new FormSelect().numberPole;
              }
            }
            parametrs.push(newparam);
       }
        return parametrs; 
    }

    //Выборка по числам и датам  "Ошибка по int нет IS NULL и  IS NOT NULL"
  public selectparamNumber: SelectCompanent[] = [
        { value: '', viewValue: 'Без условия', num: 0 },
        { value: ' = ', viewValue: 'Равно', num: 1 },
        { value: ' <> ', viewValue: 'Не равно', num: 2 },
        { value: ' > ', viewValue: 'Больше', num: 3 },
        { value: ' < ', viewValue: 'Меньше', num: 4 },
        { value: ' <= ', viewValue: 'Не больше', num: 5 },
        { value: ' >= ', viewValue: 'Не меньше', num: 6 },
        { value: ' IN ', viewValue: 'Из перечня', num: 7 } //in (1,2,3,4)
    ];

    //По строкам
   public selectparamString: SelectCompanent[] = [
        { value: '', viewValue: 'Без условия', num: 0 },
        { value: ' IS NULL ', viewValue: 'Пусто', num: 1 },
        { value: ' IS NOT NULL ', viewValue: 'Не пусто', num: 2 },
        { value: ' = ', viewValue: 'Совпадает текст', num: 3 }, //'текст'
        { value: ' <> ', viewValue: 'Не совпадает', num: 4 }, //'текст'
        { value: ' Like ', viewValue: 'Начинается', num: 5 }, //'текст%'
        { value: ' NOT LIKE ', viewValue: 'Не начинается', num: 6 }, //'текст%'
        { value: ' LIKE ', viewValue: 'Содержит', num: 7 }, // '%текст%'
        { value: ' NOT LIKE ', viewValue: 'Не содержит', num: 8 }, // '%текст%'
        { value: ' LIKE ', viewValue: 'Оканчивается', num: 9 }, // '%текст'
        { value: ' NOT LIKE ', viewValue: 'Не оканчивается', num: 10 }, // '%текст'
        { value: ' IN ', viewValue: 'Из перечня', num: 11 } // in ('1','2','3','4')
    ];

    ///Генерит команду и БД на которой выполнить команду
    generatecommand():LogicaSelect {
        var generate = new GenerateFullCommand();
        var logica = generate.generateCommand(generate.generateVisible(this.selectedtoserver, this.parametrs),this.parametrs);
        logica.idField = this.selectedtoserver.idField;
        return logica;
    }

    ///Генерит команду в бд для схемы xml
    generatecommandxml(columnDynamic:Table = null):LogicaSelect {
        var generate = new GenerateFullCommand();
        var logica = generate.generateCommand(generate.generateVisibleDynamic(this.selectedtoserver, this.parametrs, columnDynamic),this.parametrs);
        logica.idField = this.selectedtoserver.idField;
        return logica;
    }
}

class GenerateFullCommand {

    //Параметр не подставляется тогда и только тогда когда все
    // параметры SelectCompanent.num равны 0!!! Вожно!!!
    where: string = 'Where ';
   ///Динамическая генерация раскладка xml без названия (Новый образец генерится с параметрами)
    generateVisibleDynamic(logica:LogicaSelect, parametrs: SelectParam[],columnDynamic:Table = null):LogicaSelect{
        var command:LogicaSelect = new LogicaSelect()
        var str:string = '';
        var countparam:number = parametrs.filter(sel=>sel.isvisible ===true).length
        var countend:number = 0;
        for (const param of parametrs.filter(sel=>sel.isvisible ===true)) {
            countend++;
            if (countend === countparam){
                str = str.concat(param.nameparametr)
            }
            else{
                str = str.concat(param.nameparametr+', ')
            }
            columnDynamic.Colums.push({columnDef:param.nameparametr,header:param.name.trim(),cell:(element:  any) => `${element[param.nameparametr.split('.')[1]]}`,color:(param.nameparametr.split('.')[1].search('Error')==-1)?'null':'red'})
      }
      if(str ==''){
        str = str.concat(' * ')
      }
      command.selectUserField = logica.selectUserField.replace('{0}', str);
      return command;
    }

    ///Генерация другая по параметрам с названиями (Старый образец но еще используется)
    generateVisible(logica:LogicaSelect, parametrs: SelectParam[]):LogicaSelect{
        var command:LogicaSelect = new LogicaSelect()
        var str:string = '';
        var countparam:number = parametrs.filter(sel=>sel.isvisible ===true).length
        var countend:number = 0;
        for (const param of parametrs.filter(sel=>sel.isvisible ===true)) {
            countend++;
            if (countend === countparam){
                str = str.concat(param.nameparametr+' as '+`'${param.name.trim()}'`)
            }
            else{
                str = str.concat(param.nameparametr+' as '+`'${param.name.trim()}'`+', ')
            }
      }
      if(str ==''){
        str = str.concat(' * ')
      }
      command.selectUserField = logica.selectUserField.replace('{0}', str);
      return command;
    }

     generateCommand(logica:LogicaSelect,select: SelectParam[]):LogicaSelect {
        var command: string;
        var arraycommand: string = '';
        for (var sel of select) {
            if(sel.select != null && sel.select.num !== 0 && sel.paramvalue.trim() !== '') {
                switch (sel.template) {
                    case 1:
                        arraycommand += this.generateDate(sel, arraycommand);
                        break;
                    case 2:
                        arraycommand += this.generateString(sel, arraycommand);
                        break;
                    case 3:
                        arraycommand += this.generateNumber(sel, arraycommand);
                        break;
                }
            }
        }
        if (arraycommand !== '') {
            logica.selectUserField = logica.selectUserField.replace('{1}', this.where.concat(arraycommand));
        } else {
            logica.selectUserField = logica.selectUserField.replace('{1}','');
        }
        logica.selectInfoField = null;
        logica.selectedParametrField = null;
        return logica;
     }

    ///Генерация Даты c кавычками по другой логике нужно писать логику на дату т ам по другому
    generateDate(select: SelectParam, isparam: string): string {
        if (new Array(2, 3, 4, 5, 6).some(x => x === select.select.num)) {
            return this.generateStringAndNumber(select, isparam, `'${select.paramvalue.trim()}'`);
        } else {
            if (select.select.num === 1) {
                return this.generateDateEqually(select, isparam, `'${select.paramvalue.trim()}' and ${select.nameparametr} < '${moment(select.paramvalue.trim(), 'DD.MM.YYYY').add(1, 'days').format('DD.MM.YYYY')}'`);
            }
            return this.generateStringAndNumber(select, isparam, `('${select.paramvalue.trim().replace(new RegExp(/[\/]/g), '\',\'')}')`);
        }
    }
    ///Генерация строк с кавычками
    generateString(select: SelectParam, isparam: string): string {
        switch (select.select.num) {
            case 1:
                return this.generateStringAndNumber(select, isparam, '');
            case 2:
                return this.generateStringAndNumber(select, isparam, '');
            case 3:
                return this.generateStringAndNumber(select, isparam, `'${select.paramvalue.trim()}'`);
            case 4:
                return this.generateStringAndNumber(select, isparam, `'${select.paramvalue.trim()}'`);
            case 5:
                return this.generateStringAndNumber(select, isparam, `'${select.paramvalue.trim()}'`);
            case 6:
                return this.generateStringAndNumber(select, isparam, `'${select.paramvalue.trim()}%'`);
            case 7:
                return this.generateStringAndNumber(select, isparam, `'%${select.paramvalue.trim()}%'`);
            case 8:
                return this.generateStringAndNumber(select, isparam, `'%${select.paramvalue.trim()}%'`);
            case 9:
                return this.generateStringAndNumber(select, isparam, `'%${select.paramvalue.trim()}'`);
            case 10:
                return this.generateStringAndNumber(select, isparam, `'%${select.paramvalue.trim()}'`);
            case 11:
                return this.generateStringAndNumber(select, isparam, `('${select.paramvalue.trim().replace(new RegExp(/[\/]/g), '\',\'')}')`);
            default:
                return null;
        }
    }

    //Генерация чисел без ковычек
    generateNumber(select: SelectParam, isparam: string): string {
        if (new Array(1,2,3,4,5,6).some(x => x === select.select.num)) {
            return this.generateStringAndNumber(select, isparam, `${select.paramvalue.trim()}`);
        } else {
            return this.generateStringAndNumber(select, isparam, `(${select.paramvalue.trim().replace(new RegExp(/[\/]/g), ',')})`);
        }
    }
    ///Все таки Case на каждое число или из перечня параметра
    generateStringAndNumber(select: SelectParam, isparam: string, strparam: string): string {
        var str: string = '';
        if (isparam !== '') {
            return str.concat(' and ', select.nameparametr, select.select.value, strparam);
        } else {
            return str.concat(select.nameparametr, select.select.value, strparam);
        }
    }
    ///Генерация параметра дата равно
    generateDateEqually(select: SelectParam, isparam: string, strparam: string): string {
        var str: string = '';
        if (isparam !== '') {
            return str.concat(' and ', select.nameparametr, `>${select.select.value}`, strparam);
        } else {
            return str.concat(select.nameparametr, `>${select.select.value}`,strparam);
        }
    }
}