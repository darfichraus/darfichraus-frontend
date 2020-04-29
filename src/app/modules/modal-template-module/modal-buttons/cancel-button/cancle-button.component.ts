import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'modal-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
})
export class ModalCancelButtonComponent implements OnInit {

  // @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**
   * ngOnInit - on component init
   */
  ngOnInit(): void {
  }



}
