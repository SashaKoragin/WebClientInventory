import { OnInit, Component } from '@angular/core';
import { Synchronization } from '../../../Inventory/Process/Synchronization/View/Synchronization';


@Component(({
    selector: 'errorRulesUser',
    templateUrl: '../Html/Error.html',
    styleUrls: ['../Html/Error.css'],
}) as any)

export class ErrorRules implements OnInit {
   
    public ErrorRule:string = null;
   
    ngOnInit(): void {
        this.ErrorRule = "Нет соответствующих ролей для подключения к сервису!"
    }


}
