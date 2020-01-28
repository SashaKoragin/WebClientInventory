export class ConvertDate{


     regindex:string[] = ['(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})']

    ///Конвертация даты рекурсия перебора свойств и внутри
    convertDateToServer<T>(model:object):T{
        for( var key in model){
            if(typeof(model[key])==="object")
            {
                this.convertDateToServer(model[key]);
            }
            else{
             if(typeof(model[key])==="string"){
                 for (const reg of this.regindex) {
                    if(model[key].match(new RegExp(reg),'g')){
                        model[key] = `/Date(${new Date(model[key]).getTime()})/`
                       // console.log( "Ключ: " + key + " значение: " + model[key] +" тип "+ typeof(model[key])+" ЕСТЬ попадание!!! "+ model[key].match(reg));
                      } else {
                       // console.log( "Ключ: " + key + " значение: " + model[key] +" тип "+ typeof(model[key])+" НЕТ попадание!!! " + model[key].match(reg));
                      }
                 }
             }
            }
        }
        return model as any;      
    }
}