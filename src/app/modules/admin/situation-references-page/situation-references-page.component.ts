import { Component, OnInit } from '@angular/core';
import { SituationReference } from 'src/app/models/situation-reference';
import { SituationReferenceService } from './situtation-reference.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal-template-module/modal.service';
import { NotificationService } from '../../core/services/notification.service';
import { SituationReferenceDialogComponent } from './situation-type-dialog/situation-reference-dialog.component';

@Component({
  selector: 'app-situation-references-page',
  templateUrl: './situation-references-page.component.html',
  styleUrls: ['./situation-references-page.component.scss']
})
export class SituationReferencesPageComponent implements OnInit {

  situationReferences: SituationReference[] = [];
  filteredSituationReferences: SituationReference[] = [];
  selected: SituationReference[] = [];
  _search = '';

  constructor(
    private situationReferenceService: SituationReferenceService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationReferenceService.getAllSituationReferences().subscribe(
      (val) => {
        console.log(val);
        this.situationReferences = val;
        this.filteredSituationReferences = val;
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
      this.filteredSituationReferences = this.situationReferences.filter(st => {
        return st.title.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituationReferences = this.situationReferences;
    }
  }


  openModal(mode: string, st: SituationReference) {

    const dialogRef = this.dialog.open(SituationReferenceDialogComponent, {
      autoFocus: false,
      data: {mode, st},
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.situationReferences = [...this.situationReferences, result];
          this.filteredSituationReferences = [...this.filteredSituationReferences, result];
        } else if (mode === 'Edit') {
          
          const index1: number = this.situationReferences.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index1);
          const st: SituationReference[] = [...this.situationReferences];

          const index2: number = this.filteredSituationReferences.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index2);
          const fSt: SituationReference[] = [...this.situationReferences];
          //const updSt: SituationType = {...user};
          /*updUser.firstName = result.firstName;
          updUser.lastName = result.lastName;
          updUser.roles = result.roles;
          updUser.phoneNumber = result.phoneNumber;
          */
          st[index1] = result;
          this.situationReferences = st;
          fSt[index2] = result;
          this.filteredSituationReferences = fSt;
          
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
          this.situationReferences = this.situationReferences.filter(e => e.id !== st.id);
          this.filteredSituationReferences = this.filteredSituationReferences.filter(e => e.id !== st.id);
          this.situationReferenceService.deleteSituationReference(st.id).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info('Deleted ' + toBeRemoved + ' situation types.');
            }
          });
        });
      }
    });
    
  }


}
