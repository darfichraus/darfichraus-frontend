import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Advice} from '../../../models/advice';

@Component({
  selector: 'app-situation-messages-page',
  templateUrl: './situation-messages-page.component.html',
  styleUrls: ['./situation-messages-page.component.scss']
})
export class SituationMessagesPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
