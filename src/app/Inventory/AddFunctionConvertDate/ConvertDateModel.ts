import { NativeDateAdapter } from '@angular/material'
import { MatDateFormats } from '@angular/material/core'


export class ConvertDate {

  private regindex: string[] = ['(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})', '(\\d{2}-\\d{2}-\\d{4})', '(\\d{2}.\\d{2}.\\d{4} \\d{2}:\\d{2})']
  ///Конвертация даты рекурсия перебора свойств и внутри
  public convertDateToServer<T>(model: object): T {
    for (var key in model) {
      if (typeof (model[key]) === "object") {
        this.convertDateToServer(model[key]);
      }
      else {
        if (typeof (model[key]) === "string") {
          var i = 0;
          for (const reg of this.regindex) {
            if (model[key].match(new RegExp(reg), 'g')) {
              if (i == 0) {
                model[key] = `/Date(${new Date(model[key]).getTime()})/`
              }
              if (i == 1) {
                var repl = model[key].split('-');
                model[key] = `/Date(${new Date(repl[2], repl[1], repl[0]).getTime()})/`
              }
              if (i == 2) {
                var repl = model[key].split(/(\.|\s|:)/);
                model[key] = `/Date(${new Date(repl[4], repl[2], repl[0], repl[6], repl[8], 0, 0).getTime()})/`
              }
              // console.log( "Ключ: " + key + " значение: " + model[key] +" тип "+ typeof(model[key])+" ЕСТЬ попадание!!! "+ model[key].match(reg));
            } else {
              // console.log( "Ключ: " + key + " значение: " + model[key] +" тип "+ typeof(model[key])+" НЕТ попадание!!! " + model[key].match(reg));
            }
            i++
          }
        }
      }
    }
    return model as any;
  }
}



export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: {
      year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};