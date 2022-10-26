import { HostListener, NgModule, OnInit, Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component(({
    selector: 'DragAndDropFile',
    templateUrl: '../Html/UploadFilleDragAndDrop.html',
    styleUrls: ['../Css/UploadFilleDragAndDrop.css'],
}) as any)

export class DragAndDrop implements OnInit {


    public dragAreaClass: string
    public files: any
    @ViewChild('file', { static: false, read: ElementRef }) ref: ElementRef;
  
    @Output() onChangedFile = new EventEmitter<any>();
    ngOnInit(): void {
        this.dragAreaClass = "dragarea"
    }

    onFileChange(event: any) {
        this.addFile(event.target.files);
    }

    @HostListener("dragover", ["$event"]) onDragOver(event: any) {
        this.dragAreaClass = "droparea"
        event.preventDefault();
    }

    @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
        this.dragAreaClass = "droparea"
        event.preventDefault();
    }

    @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
        this.dragAreaClass = "droparea"
        event.preventDefault();
    }

    @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
        this.dragAreaClass = "droparea"
        event.preventDefault();
    }

    @HostListener("drop", ["$event"]) onDrop(event: any) {
        this.dragAreaClass = "droparea"
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            let files: FileList = event.dataTransfer.files;
            this.addFile(files);
        }
    }

    addFile(files: FileList) {
        if (files.length > 1) {
            alert("Нельзя подтянуть больше 1 файла!")
            return
        }
        else {
            this.files = files;
            this.onChangedFile.emit(this.files);
        }
    }

    delete() {
        this.files = null;
        this.ref.nativeElement.value = "";
        this.onChangedFile.emit(null);
    }

}