import { Component, OnInit } from '@angular/core';
import { SituationType } from 'src/app/models/situation-type';
import { NotificationService } from '../../core/services/notification.service';
import { ModalService } from '../../modal-template-module/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { SituationTypeService } from './situtation-types.service';
import { SituationTypeDialogComponent } from './situation-type-dialog/situation-type-dialog.component';

@Component({
  selector: 'app-situation-types-page',
  templateUrl: './situation-types-page.component.html',
  styleUrls: ['./situation-types-page.component.scss']
})
export class SituationTypesPageComponent implements OnInit {

  situationTypes: SituationType[] = [];
  filteredSituationTypes: SituationType[] = [];
  selected: SituationType[] = [];
  _search = '';

  constructor(
    private situationTypeService: SituationTypeService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationTypeService.getAllSituationTypes().subscribe(
      (val) => {
        console.log(val);
        this.situationTypes = val;
        this.filteredSituationTypes = val;
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
      this.filteredSituationTypes = this.situationTypes.filter(st => {
        return st.name.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituationTypes = this.situationTypes;
    }
  }


  openModal(mode: string, st: SituationType) {

    const dialogRef = this.dialog.open(SituationTypeDialogComponent, {
      autoFocus: false,
      data: {mode, st},
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: SituationType) => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.situationTypes = [...this.situationTypes, result];
          this.filteredSituationTypes = [...this.filteredSituationTypes, result];
          this.notificationService.info('Successfully added new situation type ' + result.name);
        } else if (mode === 'Edit') {
          
          const index1: number = this.situationTypes.findIndex((e) => e.id === result.id);
          const st: SituationType[] = [...this.situationTypes];

          const index2: number = this.situationTypes.findIndex((e) => e.id === result.id);
          const fSt: SituationType[] = [...this.situationTypes];

          st[index1] = result;
          this.situationTypes = st;
          fSt[index2] = result;
          this.filteredSituationTypes = fSt;
          this.notificationService.info('Successfully edited situation type ' + result.name);

        }
    }

    });


  }

  onDeleteSelection() {
    
    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      'Do you want to delete ' + toBeRemoved + ' situation types?'
    );


    dialogRef.afterClosed().subscribe((val) => {
      console.log(val);
      if (val === true) {
        let count = 0;
        this.selected.forEach((st) => {
          this.situationTypes = this.situationTypes.filter(e => e.id !== st.id);
          this.filteredSituationTypes = this.filteredSituationTypes.filter(e => e.id !== st.id);
          this.situationTypeService.deleteSituationType(st.id).subscribe((val) => {
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
