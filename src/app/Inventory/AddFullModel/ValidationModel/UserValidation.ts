import { FormGroup, FormControl, Validators,AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
import { Otdels, Position, Users } from '../../ModelInventory/InventoryModel';






export const positionValidator: ValidatorFn = (control: FormGroup): ValidationErrors  => {
    var namePosition = control.get('NamePosition').value as Position;
    var nameOtdel = control.get('NameOtdel').value as Otdels;
    return  nameOtdel.NameOtdel == undefined
         || namePosition.NamePosition == undefined ? { 'identityRevealed': true } : null
};

export class ModelValidation  {

    ///Валидационная модель проверки Групп
    getRowValidatorModel: FormGroup[] =[
        ///Валидация пользователя
         new FormGroup({
                'Name': new FormControl(null, Validators.required),
                'TabelNumber': new FormControl(null, Validators.required),
                'Telephon': new FormControl(null, Validators.required),
                'TelephonUndeground': new FormControl(null, Validators.required),
                'IpTelephon': new FormControl(null, Validators.required),
                'NamePosition': new FormControl({value: new Position()}, [Validators.required]),
                'NameOtdel': new FormControl({value: new Otdels()}, [Validators.required]),
            },{ validators: positionValidator }
            ),
        ];
 }