import { Component, OnInit } from '@angular/core';
import { Advice } from 'src/app/models/advice';
import { MatDialog } from '@angular/material/dialog';
import { AdvisorModalComponent } from './advisor-modal/advisor-modal.component';

@Component({
  selector: 'app-advisor-admin-page',
  templateUrl: './advisor-admin-page.component.html',
  styleUrls: ['./advisor-admin-page.component.scss']
})
export class AdvisorAdminPageComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(mode: string, advice: Advice) {
    const dialogRef = this.dialog.open(AdvisorModalComponent, {
      width: '1400px',
      height: '1000px',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
