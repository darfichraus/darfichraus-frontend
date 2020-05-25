import { Component, OnInit } from "@angular/core";
import { Webresource } from "src/app/models/webresource";
import { ModalService } from "../../modal-template-module/modal.service";
import { NotificationService } from "../../core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { WebresourceService } from "./assets.service";
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: "app-assets-page",
  templateUrl: "./assets-page.component.html",
  styleUrls: ["./assets-page.component.scss"],
})
export class AssetsPageComponent implements OnInit {
  webresources: Webresource[] = [];
  filteredWebresources: Webresource[] = [];
  selected: Webresource[] = [];
  _search = "";

  constructor(
    private webresourceService: WebresourceService,
    private modalService: ModalService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.webresourceService.getWebresource().subscribe(
      (val) => {
        console.log(val);
        this.webresources = val;
        this.filteredWebresources = val;
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
      this.filteredWebresources = this.webresources.filter((st) => {
        return st.id.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredWebresources = this.webresources;
    }
  }

  openModal() {


    const dialogRef = this.dialog.open(FileUploadComponent, {
      autoFocus: false,
      width: "450px",
      panelClass: 'custom-dialog-container',
    });

    /*
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

          const index2: number = this.situationCategories.findIndex((e) => e.id === result.id);
          console.log("index");
          console.log(index2);
          const fSt: SituationCategory[] = [...this.situationCategories];
          //const updSt: SituationType = {...user};

          
          st[index1] = result;
          this.situationCategories = st;
          fSt[index2] = result;
          this.filteredSituationCategories = fSt;
          
        }
    }

    });

    */
  }

  onDeleteSelection() {
    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      "Do you want to delete " + toBeRemoved + " users?"
    );

    dialogRef.afterClosed().subscribe((val) => {
      console.log(val);
      if (val === true) {
        let count = 0;
        this.selected.forEach((st) => {
          this.webresources = this.webresources.filter((e) => e.id !== st.id);
          this.filteredWebresources = this.filteredWebresources.filter(
            (e) => e.id !== st.id
          );
          this.webresourceService.deleteWebresource(st.id).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info(
                "Deleted " + toBeRemoved + " webresources."
              );
            }
          });
        });
      }
    });
  }


}
