import { Component, OnInit, Input } from '@angular/core';
import { Restriction } from 'src/app/models/restriction';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';
import { RestrictionsReviewService } from '../restrictions-review.service';

@Component({
  selector: 'restriction-table',
  templateUrl: './restriction-table.component.html',
  styleUrls: ['./restriction-table.component.scss']
})
export class RestrictionTableComponent implements OnInit {

  @Input() set restrictions(value: Restriction[]) {
    this.allRestrictions = value;
    const lowercase = this._search.toLowerCase().trim();
    this.filteredRestrictions = this.allRestrictions.filter((sub) => {
      return (sub.id.toLowerCase().indexOf(lowercase) >= 0);
    });
  }
  
  // restrictions: Restriction[] = [];
  filteredRestrictions: Restriction[] = [];
  allRestrictions: Restriction[] = [];
  selected = [];
  _search = '';
  restrictionToIcon = RestrictionTypeTranslator.translateToIcon;
  restrictionToType = RestrictionTypeTranslator.translate;

  constructor(private restrictionsReviewService: RestrictionsReviewService) { }

 ngOnInit(): void {


  }

  get searchQuery() {
    return this._search;
  }

  set searchQuery(value: string) {
    this._search = value;
    if (value) {
      const lowercase = value.toLowerCase().trim();
      this.filteredRestrictions = this.allRestrictions.filter((sub) => {
        return (sub.id.toLowerCase().indexOf(lowercase) >= 0);
      });
    } else {
      this.filteredRestrictions = this.allRestrictions;
    }
  }

  deleteRestriction(restr) {
    /*const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        this.adminReviewService.deleteRestriction(restr).subscribe((val) => {

          this.adminReviewService.deleteRestrictionFromData(restr);

        }, (err) => {
          console.log(err);
        });

      }

    });
    */

  }

  onDeleteSelection() {

  }




  openDialog(row): void {

    /*
    const dialogRef = this.dialog.open(MeldungReactiveComponent, {
      width: '900px',
      height: '700px',
      restoreFocus: false,
      autoFocus: false,
      hasBackdrop: true,
      data: row,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    */
  }

}
