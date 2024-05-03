import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Otdel, Position, FullProizvoditel, FullModel, NameSysBlock, NameMonitor, ProizvoditelBlockPower, ModelBlockPower, ModelSwithes, TypeServer, Users, TaskAis3, ResourceIt, TypeOther, ProizvoditelOther, ModelOther, EquipmentType, Producer, EquipmentModel, ModelPhone } from '../../ModelInventory/InventoryModel';
import { EquipmentState, EquipmentStateSto, EquipmentExpertise } from '../DialogAksiokEditAndAdd/DialogAksiokModel/DialogAksiokModel';
import { View, Type, Mouth } from '../DialogReportCard/ReportCardModel/ReportCardModel';



export class ModelValidation {

    constructor(public dateGuarantee: Date = new Date()) { }
    //Валидация года
    public validationMouthModel(control: AbstractControl): ValidationErrors {
        var nameNameOtdel = control.value as Mouth;
        return (nameNameOtdel == undefined || nameNameOtdel.nameMouthField) == undefined ? { 'error': true } : null
    };
    //Валидация вида
    public validationViewModel(control: AbstractControl): ValidationErrors {
        var nameNameOtdel = control.value as View;
        return (nameNameOtdel == undefined || nameNameOtdel.nameViewField) == undefined ? { 'error': true } : null
    };
    //Валидация типа
    public validationTypeModel(control: AbstractControl): ValidationErrors {
        var nameNameOtdel = control.value as Type;
        return (nameNameOtdel == undefined || nameNameOtdel.nameTypeField) == undefined ? { 'error': true } : null
    };
    //Валидация наименование отдела
    public validationNameOtdel(control: AbstractControl): ValidationErrors {
        var nameNameOtdel = control.value as Otdel;
        return (nameNameOtdel == undefined || nameNameOtdel.NameOtdel) == undefined ? { 'error': true } : null
    };

    //Валидация пользователя
    public validationUsers(control: AbstractControl): ValidationErrors {
        var nameUsers = control.value as Users;
        return (nameUsers == undefined || nameUsers.NameUser) == undefined ? { 'error': true } : null
    }

    //Валидация наименование должности
    public validationNamePosition(control: AbstractControl): ValidationErrors {
        var namePosition = control.value as Position;
        return (namePosition == undefined || namePosition.NamePosition) == undefined ? { 'error': true } : null
    };

    //Валидация производителя
    public validationFullProizvodite(control: AbstractControl): ValidationErrors {
        var nameProizvoditel = control.value as FullProizvoditel;
        return (nameProizvoditel == undefined || nameProizvoditel.NameProizvoditel) == undefined ? { 'error': true } : null
    };
    //Валидация производителя системных блоков
    public validationFullNameSysBlock(control: AbstractControl): ValidationErrors {
        var nameProizvoditel = control.value as NameSysBlock;
        return (nameProizvoditel == undefined || nameProizvoditel.NameComputer) == undefined ? { 'error': true } : null
    };
    //Валидация производителя мониторов
    public validationFullNameMonitor(control: AbstractControl): ValidationErrors {
        var nameProizvoditel = control.value as NameMonitor;
        return (nameProizvoditel == undefined || nameProizvoditel.NameManufacturer) == undefined ? { 'error': true } : null
    };

    //Валидация Модели
    public validationFullModel(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as FullModel;
        return (nameModel == undefined || nameModel.NameModel == undefined) ? { 'error': true } : null
    };

    //Валидация производителя ИБП
    public validationFullProizvoditeIbp(control: AbstractControl): ValidationErrors {
        var nameProizvoditel = control.value as ProizvoditelBlockPower;
        return (nameProizvoditel == undefined || nameProizvoditel.Name) == undefined ? { 'error': true } : null
    };

    //Валидация типа Разного
    public validationTypeOther(control: AbstractControl): ValidationErrors {
        var nameTypeOther = control.value as TypeOther;
        return (nameTypeOther == undefined || nameTypeOther.Name) == undefined ? { 'error': true } : null
    };

    //Валидация производителя Разного
    public validationProizvoditelOther(control: AbstractControl): ValidationErrors {
        var nameProizvoditelOther = control.value as ProizvoditelOther;
        return (nameProizvoditelOther == undefined || nameProizvoditelOther.Name) == undefined ? { 'error': true } : null
    };
    //Валидация моделей Разного
    public validationModelOther(control: AbstractControl): ValidationErrors {
        var nameModelOther = control.value as ModelOther;
        return (nameModelOther == undefined || nameModelOther.Name) == undefined ? { 'error': true } : null
    };
    //Валидация Модели ИБП
    public validationFullModelIbp(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as ModelBlockPower;
        return (nameModel == undefined || nameModel.Name == undefined) ? { 'error': true } : null
    };
    //Валидация моделей коммутатора
    public validationTaskAis3(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as TaskAis3;
        return (nameModel == undefined || nameModel.NameTask == undefined) ? { 'error': true } : null
    };
    //Валидация моделей коммутатора
    public validationResourceIt(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as ResourceIt;
        return (nameModel == undefined || nameModel.NameResource == undefined) ? { 'error': true } : null
    };

    //Валидация моделей коммутатора
    public validationFullModelSwith(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as ModelSwithes;
        return (nameModel == undefined || nameModel.NameModel == undefined) ? { 'error': true } : null
    };

    //Валидация типа серверного оборудования
    public validationTypeServer(control: AbstractControl): ValidationErrors {
        var nameModel = control.value as TypeServer;
        return (nameModel == undefined || nameModel.NameType == undefined) ? { 'error': true } : null
    };

    public validationNumber(control: AbstractControl): ValidationErrors {
        control.value
        var regx = new RegExp(/^\d+$/, 'g')
        if (regx.test(control.value)) {
            return null;
        }
        else {
            return { 'error': true };
        }
    }

    //Валидация типа оборудования
    public validationEquipmentType(control: AbstractControl): ValidationErrors {
        var nameEquipmentType = control.value as EquipmentType;
        return (nameEquipmentType == undefined || nameEquipmentType.NameType) == undefined ? { 'error': true } : null
    };
    //Валидация производителя оборудования
    public validationProducer(control: AbstractControl): ValidationErrors {
        var nameProducer = control.value as Producer;
        return (nameProducer == undefined || nameProducer.NameProducer) == undefined ? { 'error': true } : null
    };
    //Валидация производителя оборудования
    public validationEquipmentModel(control: AbstractControl): ValidationErrors {
        var nameEquipmentModel = control.value as EquipmentModel;
        return (nameEquipmentModel == undefined || nameEquipmentModel.NameModel) == undefined ? { 'error': true } : null
    };
    ///Валидация статуса оборудования 
    public validationState(control: AbstractControl): ValidationErrors {
        var nameState = control.value as EquipmentState;
        return (nameState == undefined || nameState.NameState) == undefined ? { 'error': true } : null
    }
    ///Валидация статуса СТО оборудования 
    public validationStateSto(control: AbstractControl): ValidationErrors {
        var nameStateSto = control.value as EquipmentStateSto;
        return (nameStateSto == undefined || nameStateSto.NameStateSto) == undefined ? { 'error': true } : null
    }
    ///Валидация статуса Экспертизы оборудования 
    public validationExpertise(control: AbstractControl): ValidationErrors {
        var nameExpertise = control.value as EquipmentExpertise;
        return (nameExpertise == undefined || nameExpertise.NameExpertise) == undefined ? { 'error': true } : null
    }
    ///Валидация модели телефонов
    public validationModelPhone(control: AbstractControl): ValidationErrors {
        var namePhone = control.value as ModelPhone;
        return (namePhone == undefined || namePhone.NameModel) == undefined ? { 'error': true } : null
    }

    ///Валидационная модель проверки Групп
    getRowValidatorModel: FormGroup[] = [
        ///Валидация пользователя
        new FormGroup({
            'NameUser': new FormControl(null, Validators.required),
            'TabelNumber': new FormControl(null, Validators.required),
            'NamePosition': new FormControl({ value: new Position() }, [Validators.required, this.validationNamePosition]),
            'NameOtdel': new FormControl({ value: new Otdel() }, [Validators.required, this.validationNameOtdel]),
        }),
        new FormGroup({
            'ZavNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required),
            'Proizvoditel': new FormControl({ value: new FullProizvoditel() }, [Validators.required, this.validationFullProizvodite]),
            'Model': new FormControl({ value: new FullModel() }, [Validators.required, this.validationFullModel])
        }),
        new FormGroup({
            'SerNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required),
            'NameComputer': new FormControl(null, Validators.required),
            'Model': new FormControl({ value: new NameSysBlock() }, [Validators.required, this.validationFullNameSysBlock]),
        }),
        new FormGroup({
            'SerNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required),
            'Model': new FormControl({ value: new NameMonitor() }, [Validators.required, this.validationFullNameMonitor]),
        }),
        new FormGroup({
            'NameModel': new FormControl({ value: new ModelPhone() }, [Validators.required, this.validationModelPhone]),
            'SerNumber': new FormControl(null, Validators.required),
            'MacTelephone': new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'Proizvoditel': new FormControl({ value: new ProizvoditelBlockPower() }, [Validators.required, this.validationFullProizvoditeIbp]),
            'Model': new FormControl({ value: new ModelBlockPower() }, [Validators.required, this.validationFullModelIbp]),
            'ZavNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'NameCopySave': new FormControl(null, Validators.required),
            'SerNumCopySave': new FormControl(null, Validators.required),
            'InventarNumCopySave': new FormControl(null, Validators.required),
        }),
        new FormGroup({
            'Model': new FormControl({ value: new ModelSwithes() }, [Validators.required, this.validationFullModelSwith]),
            'SerNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'Identifikator': new FormControl(null, [Validators.required, Validators.maxLength(32), this.validationNumber]),
        }),
        new FormGroup({
            'IdOtdelNumber': new FormControl(null, [Validators.required, Validators.maxLength(2), Validators.max(99), Validators.min(1)]),
            'NameGroup': new FormControl(null, [Validators.required, Validators.maxLength(64)])
        }),
        new FormGroup({
            'TypeServer': new FormControl({ value: new TypeServer() }, [Validators.required, this.validationTypeServer])
        }),
        new FormGroup({
            'ProizvoditelName': new FormControl(null, Validators.required),
            'SerNum': new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'TaskAis3': new FormControl({ value: new TaskAis3() }, [Validators.required, this.validationTaskAis3]),
            'ResourceIt': new FormControl({ value: new ResourceIt() }, [Validators.required, this.validationResourceIt]),
            'DateTask': new FormControl(new Date(), [Validators.required])
        }),
        //Модель ошибок журнал
        new FormGroup({
            'Year': new FormControl(null, Validators.required),
            'Mouth': new FormControl({ value: new Mouth() }, [Validators.required, this.validationMouthModel]),
            'View': new FormControl({ value: new View() }, [Validators.required, this.validationViewModel]),
            'Type': new FormControl({ value: new Type() }, [Validators.required, this.validationTypeModel]),
        }),
        //Модель разного оборудования
        new FormGroup({
            'TypeOther': new FormControl({ value: new TypeOther() }, [Validators.required, this.validationTypeOther]),
            'ProizvoditelOther': new FormControl({ value: new ProizvoditelOther() }, [Validators.required, this.validationProizvoditelOther]),
            'ModelOther': new FormControl({ value: new ModelOther() }, [Validators.required, this.validationModelOther]),
            'SerNum': new FormControl(null, Validators.required),
            'InventarNum': new FormControl(null, Validators.required)
        }),
        new FormGroup({
            'DayX': new FormControl(null, [Validators.min(1), Validators.max(31)]),
            'HoursX': new FormControl(null, [Validators.min(0), Validators.max(23)]),
            'MinutesX': new FormControl(null, [Validators.min(0), Validators.max(60)]),
        }),
        new FormGroup({
            'EquipmentType': new FormControl(null, [Validators.required, this.validationEquipmentType]),
            'Producer': new FormControl(null, [Validators.required, this.validationProducer]),
            'EquipmentModel': new FormControl(null, [Validators.required, this.validationEquipmentModel]),
            'State': new FormControl(null, [Validators.required, this.validationState]),
            'StateSto': new FormControl(null, [Validators.required, this.validationStateSto]),
            'Expertise': new FormControl(null, [Validators.required, this.validationExpertise]),
            'Guarantee': new FormControl({ value: this.dateGuarantee, disabled: true }, [Validators.required])
        })
    ];
}