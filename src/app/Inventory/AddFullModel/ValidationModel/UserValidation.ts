import { FormGroup, FormControl, Validators,AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
import { Otdels, Position, FullProizvoditel, FullModel, Kabinet, NameSysBlock, NameMonitor } from '../../ModelInventory/InventoryModel';


export class ModelValidation  {

    //Валидация наименование отдела
    public validationNameOtdel(control: AbstractControl): ValidationErrors  {
        var nameNameOtdel = control.value as Otdels;
        return  (nameNameOtdel == undefined || nameNameOtdel.NameOtdel) == undefined   ? { 'error': true  } : null
    };

    //Валидация наименование должности
    public validationNamePosition(control: AbstractControl): ValidationErrors  {
        var namePosition = control.value as Position;
        return  (namePosition == undefined || namePosition.NamePosition) == undefined   ? { 'error': true  } : null
    };

    //Валидация производителя
    public validationFullProizvodite(control: AbstractControl): ValidationErrors  {
        var nameProizvoditel = control.value as FullProizvoditel;
        return  (nameProizvoditel == undefined || nameProizvoditel.NameProizvoditel) == undefined   ? { 'error': true  } : null
    };
    //Валидация производителя системных блоков
    public validationFullNameSysBlock(control: AbstractControl): ValidationErrors  {
        var nameProizvoditel = control.value as NameSysBlock;
        return  (nameProizvoditel == undefined || nameProizvoditel.NameComputer) == undefined   ? { 'error': true  } : null
    };
    //Валидация производителя мониторов
    public validationFullNameMonitor(control: AbstractControl): ValidationErrors  {
        var nameProizvoditel = control.value as NameMonitor;
        return  (nameProizvoditel == undefined || nameProizvoditel.NameMonitor_) == undefined   ? { 'error': true  } : null
    };

    //Валидация Модели
    public validationFullModel(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as FullModel;
        return  (nameModel == undefined||nameModel.NameModel == undefined)  ?  { 'error': true  } : null
    };
    //Валидация Кабинета
    public validationKabinet(control: AbstractControl): ValidationErrors {
            var nameKabinet = control.value as Kabinet;
            return (nameKabinet === undefined||nameKabinet.NumberKabinet === undefined)  ? { 'error': true  } : null
    };
    
    ///Валидационная модель проверки Групп
    getRowValidatorModel: FormGroup[] =[
        ///Валидация пользователя
         new FormGroup({
                'Name': new FormControl(null, Validators.required),
                'TabelNumber': new FormControl(null, Validators.required),
                'Telephon': new FormControl(null, Validators.required),
                'TelephonUndeground': new FormControl(null, Validators.required),
                'IpTelephon': new FormControl(null, Validators.required),
                'NamePosition': new FormControl({value: new Position()}, [Validators.required,this.validationNamePosition]),
                'NameOtdel': new FormControl({value: new Otdels()}, [Validators.required,this.validationNameOtdel]),
            }
            ),
         new FormGroup({
            'ZavNum':new FormControl(null, Validators.required),
            'ServiceNum':new FormControl(null, Validators.required),
            'InventarNum':new FormControl(null, Validators.required),
            'Proizvoditel':new FormControl({value: new FullProizvoditel()}, [Validators.required, this.validationFullProizvodite]),
            'Model':new FormControl({value: new FullModel()}, [Validators.required, this.validationFullModel]),
            'Kabinet':new FormControl({value: new Kabinet()}, [Validators.required, this.validationKabinet])
            }
            ),
            new FormGroup({
                'SerNum':new FormControl(null, Validators.required),
                'InventarNum':new FormControl(null, Validators.required),
                'NameComputer':new FormControl(null, Validators.required),
                'Model':new FormControl({value: new NameSysBlock()}, [Validators.required, this.validationFullNameSysBlock]),
                }),
            new FormGroup({
                'SerNum':new FormControl(null, Validators.required),
                'InventarNum':new FormControl(null, Validators.required),
                'Model':new FormControl({value: new NameMonitor()}, [Validators.required, this.validationFullNameMonitor]),
                })

        ];
 }