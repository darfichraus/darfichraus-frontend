import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {Advice} from '../../../models/advice';
import { SituationMessageService } from './situtation-message-type.service';
import { ModalService } from '../../modal-template-module/modal.service';
import { NotificationService } from '../../core/services/notification.service';
import { SituationMessage } from 'src/app/models/situation-message';

@Component({
  selector: 'app-situation-messages-page',
  templateUrl: './situation-messages-page.component.html',
  styleUrls: ['./situation-messages-page.component.scss']
})
export class SituationMessagesPageComponent implements OnInit {

  situationMessages: SituationMessage[] = [];
  filteredSituationMessages: SituationMessage[] = [];
  selected: SituationMessage[] = [];
  _search = '';

  constructor(
    private situationMessageTypeService: SituationMessageService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationMessageTypeService.getAllSituationMessages().subscribe(
      (val) => {
        console.log(val);
        this.situationMessages = val;
        this.filteredSituationMessages = val;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  get searchQuery() {
    return this._search;
  }

  set searchQuery(value: string) {
    this._search = value;
    if (value) {
      const lowercase = value.toLowerCase().trim();
      this.filteredSituationMessages = this.situationMessages.filter(st => {
        return st.title.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituationMessages = this.situationMessages;
    }
  }


  openModal(mode: string, smt: SituationMessage) {

    /*
    const dialogRef = this.dialog.open(SituationMessageTypeDialogComponent, {
      autoFocus: false,
      data: {mode, smt},
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.situationMessageTypes = [...this.situationMessageTypes, result];
          this.filteredSituationMessageTypes = [...this.filteredSituationMessageTypes, result];
        } else if (mode === 'Edit') {

          const index1: number = this.situationMessageTypes.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index1);
          const st: SituationMessageType[] = [...this.situationMessageTypes];

          const index2: number = this.situationMessageTypes.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index2);
          const fSt: SituationMessageType[] = [...this.situationMessageTypes];

          st[index1] = result;
          this.situationMessageTypes = st;
          fSt[index2] = result;
          this.filteredSituationMessageTypes = fSt;

        }
    }

    });

    */

  }

  onDeleteSelection() {

    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      'Do you want to delete ' + toBeRemoved + ' users?'
    );

    dialogRef.afterClosed().subscribe((val) => {
      console.log(val);
      if (val === true) {
        let count = 0;
        this.selected.forEach((st) => {
          this.situationMessages = this.situationMessages.filter(e => e.id !== st.id);
          this.filteredSituationMessages = this.filteredSituationMessages.filter(e => e.id !== st.id);
          this.situationMessageTypeService.deleteSituationMessage(st.id).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info('Deleted ' + toBeRemoved + ' situation message types.');
            }
          });
        });
      }
    });

  }


}
