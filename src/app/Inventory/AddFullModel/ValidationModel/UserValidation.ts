import { FormGroup, FormControl, Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { Otdel, Position, FullProizvoditel, FullModel, NameSysBlock, NameMonitor, ProizvoditelBlockPower, ModelBlockPower, ModelSwithes, ModelSeverEquipment, ManufacturerSeverEquipment, TypeServer, Users, SysBlock, TaskAis3, ResourceIt } from '../../ModelInventory/InventoryModel';
import { User } from '../../User/View/User';



export class ModelValidation  {

    //Валидация наименование отдела
    public validationNameOtdel(control: AbstractControl): ValidationErrors  {
        var nameNameOtdel = control.value as Otdel;
        return  (nameNameOtdel == undefined || nameNameOtdel.NameOtdel) == undefined   ? { 'error': true  } : null
    };

    //Валидация пользователя
    public validationUsers(control: AbstractControl): ValidationErrors  {
        var nameUsers = control.value as Users;
        return  (nameUsers == undefined || nameUsers.Name) == undefined   ? { 'error': true  } : null
    }

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
        return  (nameProizvoditel == undefined || nameProizvoditel.Name) == undefined   ? { 'error': true  } : null
    };

    //Валидация Модели
    public validationFullModel(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as FullModel;
        return  (nameModel == undefined||nameModel.NameModel == undefined)  ?  { 'error': true  } : null
    };

        //Валидация производителя ИБП
    public validationFullProizvoditeIbp(control: AbstractControl): ValidationErrors  {
            var nameProizvoditel = control.value as ProizvoditelBlockPower;
            return  (nameProizvoditel == undefined || nameProizvoditel.Name) == undefined   ? { 'error': true  } : null
    };

        //Валидация Модели ИБП
    public validationFullModelIbp(control: AbstractControl): ValidationErrors  {
            var nameModel = control.value as ModelBlockPower;
            return  (nameModel == undefined||nameModel.Name == undefined)  ?  { 'error': true  } : null
    };
    //Валидация моделей коммутатора
    public validationTaskAis3(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as TaskAis3;
        return  (nameModel == undefined||nameModel.NameTask == undefined)  ?  { 'error': true  } : null
    };
    //Валидация моделей коммутатора
    public validationResourceIt(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as ResourceIt;
        return (nameModel == undefined||nameModel.NameResource == undefined)  ?  { 'error': true  } : null
    };

    //Валидация моделей коммутатора
    public validationFullModelSwith(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as ModelSwithes;
        return  (nameModel == undefined||nameModel.NameModel == undefined)  ?  { 'error': true  } : null
    };

    //Валидация типа серверного оборудования
    public validationTypeServer(control: AbstractControl): ValidationErrors  {
        var nameModel = control.value as TypeServer;
        return  (nameModel == undefined||nameModel.NameType == undefined)  ?  { 'error': true  } : null
    };

    public validationNumber(control: AbstractControl): ValidationErrors{
        control.value
        var regx = new RegExp(/^\d+$/,'g')
        if(regx.test(control.value)){
            return null;
        }
        else{
            return { 'error': true  };
        }
    }

    ///Валидационная модель проверки Групп
    getRowValidatorModel: FormGroup[] =[
        ///Валидация пользователя
         new FormGroup({
                'Name': new FormControl(null, Validators.required),
                'TabelNumber': new FormControl(null, Validators.required),
                'NamePosition': new FormControl({value: new Position()}, [Validators.required,this.validationNamePosition]),
                'NameOtdel': new FormControl({value: new Otdel()}, [Validators.required,this.validationNameOtdel]),
            }),
         new FormGroup({
            'ZavNum':new FormControl(null, Validators.required),
            'InventarNum':new FormControl(null, Validators.required),
            'Proizvoditel':new FormControl({value: new FullProizvoditel()}, [Validators.required, this.validationFullProizvodite]),
            'Model':new FormControl({value: new FullModel()}, [Validators.required, this.validationFullModel])
            }),
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
            }),
        new FormGroup({
            'NameTelephone':new FormControl(null,Validators.required),
            'Telephone':new FormControl(null,Validators.required),
            'SerNumber':new FormControl(null,Validators.required),
            'IpTelephone':new FormControl(null,Validators.required),
            'MacTelephone':new FormControl(null,Validators.required)
            }),
        new FormGroup({
            'Proizvoditel':new FormControl({value: new ProizvoditelBlockPower()}, [Validators.required, this.validationFullProizvoditeIbp]),
            'Model':new FormControl({value: new ModelBlockPower()}, [Validators.required, this.validationFullModelIbp]),
            'ZavNum':new FormControl(null, Validators.required),
            'InventarNum':new FormControl(null, Validators.required)
            }),
        new FormGroup({
            'NameCopySave':new FormControl(null, Validators.required),
            'SerNum':new FormControl(null, Validators.required),
            'InventarNum':new FormControl(null, Validators.required),
            }),
        new FormGroup({
            'Model':new FormControl({value: new ModelSwithes()}, [Validators.required, this.validationFullModelSwith]),
            'SerNum':new FormControl(null, Validators.required),
            'InventarNum':new FormControl(null, Validators.required)
            }),
        new FormGroup({
            'Identifikator':new FormControl(null, [Validators.required,Validators.maxLength(32),this.validationNumber]),
            }),
        new FormGroup({
            'IdOtdelNumber':new FormControl(null, [Validators.required,Validators.maxLength(2),Validators.max(99),Validators.min(1)]),
            'NameGroup':new FormControl(null,[Validators.required,Validators.maxLength(64)])
        }),
        new FormGroup({
            'TypeServer':new FormControl({value:new TypeServer()},[Validators.required,this.validationTypeServer])
        }),
        new FormGroup({
            'ProizvoditelName':new FormControl(null, Validators.required),
            'SerNum':new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'TaskAis3': new FormControl({value: new TaskAis3()},[Validators.required, this.validationTaskAis3]),
            'ResourceIt': new FormControl({value: new ResourceIt()},[Validators.required, this.validationResourceIt]),
            'DateTask': new FormControl(new Date(),[Validators.required])
        })
        ];
 }