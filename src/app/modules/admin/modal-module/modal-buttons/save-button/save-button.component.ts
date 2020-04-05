import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'eta-modal-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class ModalSaveButtonComponent implements OnInit {

  @Input() disabled: boolean;

  constructor() { }

  /**
   * ngOnInit - on component init
   */
  ngOnInit(): void {
  }



}
