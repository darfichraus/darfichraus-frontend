import { Component, OnInit } from '@angular/core';
import { SituationMessageType } from 'src/app/models/situation-message-type';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal-template-module/modal.service';
import { NotificationService } from '../../core/services/notification.service';
import { SituationMessageTypeService } from './situtation-message-type.service';
import { SituationMessageTypeDialogComponent } from './situation-message-type-dialog/situation-message-type-dialog.component';

@Component({
  selector: 'app-situation-message-types-page',
  templateUrl: './situation-message-types-page.component.html',
  styleUrls: ['./situation-message-types-page.component.scss']
})
export class SituationMessageTypesPageComponent implements OnInit {


  situationMessageTypes: SituationMessageType[] = [];
  filteredSituationMessageTypes: SituationMessageType[] = [];
  selected: SituationMessageType[] = [];
  _search = '';

  constructor(
    private situationMessageTypeService: SituationMessageTypeService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationMessageTypeService.getAllSituationMessageTypes().subscribe(
      (val) => {
        console.log(val);
        this.situationMessageTypes = val;
        this.filteredSituationMessageTypes = val;
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
      this.filteredSituationMessageTypes = this.situationMessageTypes.filter(st => {
        return st.name.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituationMessageTypes = this.situationMessageTypes;
    }
  }


  openModal(mode: string, smt: SituationMessageType) {

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
          //const updSt: SituationType = {...user};
          /*updUser.firstName = result.firstName;
          updUser.lastName = result.lastName;
          updUser.roles = result.roles;
          updUser.phoneNumber = result.phoneNumber;
          */
          st[index1] = result;
          this.situationMessageTypes = st;
          fSt[index2] = result;
          this.filteredSituationMessageTypes = fSt;

        }
    }

    });


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
          this.situationMessageTypes = this.situationMessageTypes.filter(e => e.id !== st.id);
          this.filteredSituationMessageTypes = this.filteredSituationMessageTypes.filter(e => e.id !== st.id);
          this.situationMessageTypeService.deleteSituationMessageType(st.id).subscribe((val) => {
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
