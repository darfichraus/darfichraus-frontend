import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})
export class FileDropDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    // $event object is DragEvent and consists of dataTransfer, target, etc.
    $event.preventDefault();
    let transfer = $event.dataTransfer;
    this.dropped.emit(transfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
