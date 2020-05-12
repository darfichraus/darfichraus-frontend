import { Component, OnInit } from '@angular/core';
import { Situation } from 'src/app/models/situation';
import { SituationService } from './situations.service';
import { ModalService } from '../../modal-template-module/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../core/services/notification.service';
import { SituationDialogComponent } from './situation-dialog/situation-dialog.component';

@Component({
  selector: 'app-situations-page',
  templateUrl: './situations-page.component.html',
  styleUrls: ['./situations-page.component.scss']
})
export class SituationsPageComponent implements OnInit {

  situationTypes: Situation[] = [];
  filteredSituations: Situation[] = [];
  selected: Situation[] = [];
  _search = '';

  constructor(
    private situationService: SituationService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationService.getAllSituations().subscribe(
      (val) => {
        console.log(val);
        this.situationTypes = val;
        this.filteredSituations = val;
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
      this.filteredSituations = this.situationTypes.filter(st => {
        return st.name.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituations = this.situationTypes;
    }
  }


  openModal(mode: string, st: Situation) {

    const dialogRef = this.dialog.open(SituationDialogComponent, {
      autoFocus: false,
      data: {mode, st},
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.situationTypes = [...this.situationTypes, result];
          this.filteredSituations = [...this.filteredSituations, result];
        } else if (mode === 'Edit') {
          
          const index1: number = this.situationTypes.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index1);
          const st: Situation[] = [...this.situationTypes];

          const index2: number = this.situationTypes.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index2);
          const fSt: Situation[] = [...this.situationTypes];
          //const updSt: SituationType = {...user};
          /*updUser.firstName = result.firstName;
          updUser.lastName = result.lastName;
          updUser.roles = result.roles;
          updUser.phoneNumber = result.phoneNumber;
          */
          st[index1] = result;
          this.situationTypes = st;
          fSt[index2] = result;
          this.filteredSituations = fSt;
          
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
          this.situationTypes = this.situationTypes.filter(e => e.id !== st.id);
          this.filteredSituations = this.filteredSituations.filter(e => e.id !== st.id);
          this.situationService.deleteSituation(st.id).subscribe((val) => {
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
