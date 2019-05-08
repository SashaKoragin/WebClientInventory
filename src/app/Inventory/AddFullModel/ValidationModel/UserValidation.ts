import { FormGroup, FormControl, Validators } from '@angular/forms';
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
                'NameOtdel': new FormControl(null, Validators.required)
            }),
        
        ];

 }