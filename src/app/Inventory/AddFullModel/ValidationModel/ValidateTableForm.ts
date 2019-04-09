import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable()
export class UserValidation   {
    public getRowValidator() : FormGroup {
        return new FormGroup({
            'IdUser': new FormControl(null, Validators.required),
            'Name': new FormControl(null, Validators.required),
            'TabelNumber': new FormControl(null, Validators.required),
            'Telephon': new FormControl(null, Validators.required),
            'TelephonUndeground': new FormControl(null, Validators.required),
            'IpTelephon': new FormControl(null, Validators.required),
            'NameRules': new FormControl(null, Validators.required),
            'NameOtdel': new FormControl(null, Validators.required)
        });
    }
}