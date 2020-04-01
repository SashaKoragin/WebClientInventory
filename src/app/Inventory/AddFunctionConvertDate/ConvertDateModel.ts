export class ConvertDate{


    private regindex:string[] = ['(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})','(\\d{2}-\\d{2}-\\d{4})']
    ///Конвертация даты рекурсия перебора свойств и внутри
    public convertDateToServer<T>(model:object):T{
          for( var key in model){
              if(typeof(model[key])==="object")
              {
                  this.convertDateToServer(model[key]);
              }
              else{
               if(typeof(model[key])==="string"){
                   var i =0;
                   for (const reg of this.regindex) {
                      if(model[key].match(new RegExp(reg),'g')){
                          if(i==0){
                            model[key] = `/Date(${new Date(model[key]).getTime()})/`
                          }
                          if(i==1){
                           var repl = model[key].split('-');
                            model[key] = `/Date(${new Date(repl[2],repl[1],repl[0]).getTime()})/`
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