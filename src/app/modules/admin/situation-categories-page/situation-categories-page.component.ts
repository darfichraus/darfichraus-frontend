import { Component, OnInit } from '@angular/core';
import { SituationCategory } from 'src/app/models/situation-category';
import { ModalService } from '../../modal-template-module/modal.service';
import { NotificationService } from '../../core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { SituationCategoryDialogComponent } from './situation-category-dialog/situation-category-dialog.component';
import { SituationCategoryService } from './situtation-category.service';

@Component({
  selector: 'app-situation-categories-page',
  templateUrl: './situation-categories-page.component.html',
  styleUrls: ['./situation-categories-page.component.scss']
})
export class SituationCategoriesPageComponent implements OnInit {

  situationCategories: SituationCategory[] = [];
  filteredSituationCategories: SituationCategory[] = [];
  selected: SituationCategory[] = [];
  _search = '';

  constructor(
    private situationCategoryService: SituationCategoryService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.situationCategoryService.getAllSituationCategories().subscribe(
      (val) => {
        console.log(val);
        this.situationCategories = val;
        this.filteredSituationCategories = val;
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
      this.filteredSituationCategories = this.situationCategories.filter(st => {
        return st.name.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSituationCategories = this.situationCategories;
    }
  }


  openModal(mode: string, st: SituationCategory) {

    const dialogRef = this.dialog.open(SituationCategoryDialogComponent, {
      autoFocus: false,
      data: {mode, st},
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.situationCategories = [...this.situationCategories, result];
          this.filteredSituationCategories = [...this.filteredSituationCategories, result];
        } else if (mode === 'Edit') {
          
          const index1: number = this.situationCategories.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index1);
          const st: SituationCategory[] = [...this.situationCategories];

          const index2: number = this.filteredSituationCategories.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index2);
          const fSt: SituationCategory[] = [...this.filteredSituationCategories];
          
          st[index1] = result;
          this.situationCategories = st;
          fSt[index2] = result;
          this.filteredSituationCategories = fSt;
          
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
          this.situationCategories = this.situationCategories.filter(e => e.id !== st.id);
          this.filteredSituationCategories = this.filteredSituationCategories.filter(e => e.id !== st.id);
          this.situationCategoryService.deleteSituationCategory(st.id).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info('Deleted ' + toBeRemoved + ' situation categories.');
            }
          });
        });
      }
    });
    
  }


}
