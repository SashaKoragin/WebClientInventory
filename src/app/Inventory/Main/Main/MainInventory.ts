import { Component } from '@angular/core';
import { Inventar, ModelInventar } from '../Model/ModelInventory'
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthIdentification } from '../../../Post RequestService/PostRequest';

@Component(({
    selector: 'app-root',
    templateUrl: '../Html/Inventory.html',
    styleUrls: ['../Html/Inventory.css'],
    providers: [Inventar]
}) as any)

export class MainInventar {
    fullpath: string = null;
    model: string = null;
    welcome:string = null;
    nestedTreeControl: NestedTreeControl<ModelInventar>;
    nestedDataSource: MatTreeNestedDataSource<ModelInventar>;
    constructor(database: Inventar, public authService: AuthIdentification) {
        this.welcome = 'Добро пожаловать: ' + authService.fullSelect.Users.Name;
        this.nestedTreeControl = new NestedTreeControl<ModelInventar>(this._getChildren);
        this.nestedDataSource = new MatTreeNestedDataSource();
        database.dataChange.subscribe(data => this.nestedDataSource.data = data);
    }
    hasNestedChild = (_: number, nodeData: ModelInventar) => !nodeData.types;
    private _getChildren = (node: ModelInventar) => node.children;

    selectmodel(node: ModelInventar) {
        this.fullpath = 'Ветка: ' + node.fullpath;
        this.model = 'Предназначение: ' + node.model;
    }
}