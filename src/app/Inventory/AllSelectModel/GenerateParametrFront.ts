import { FormControl,ValidatorFn, AbstractControl } from '@angular/forms';
import { ModelSelect } from './ParametrModel';


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
   public  datePole = new FormControl('', [forbiddenNameValidator(/^((((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1 9])\.((?:19|20)\d{2}))\/{1})+((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1 9])\.((?:19|20)\d{2}))|((3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1 9])\.((?:19|20)\d{2}))|(^$))$/)]);
}
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
    //Ун шаблона для создания типов в ковычках или без true с кавычками false без кавычек
    numеrtemplate: boolean;
    //Шаблон 1-Дата, 2-Текст, 3-Числа :Числа и дата это 1 шаблон только даты генерятся по другому и с кавычками методу
    template: number;
    //Форма шаблона
    formTemplate: FormControl;
}

export class GenerateParametrs{


    generateparametrs(modelselect:ModelSelect):SelectParam[]{
        var parametrs:SelectParam[] = new SelectParam[modelselect.Parametrs.length]
        return parametrs; 
    }
}