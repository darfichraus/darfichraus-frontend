import { Component } from '@angular/core';
import { MeldungComponent } from './meldung/meldung.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dir-frontend';
  mode: string;


  constructor(private dialog: MatDialog) {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(MeldungComponent, {
      width: '1200px',
      height: '900px',
      restoreFocus: false,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onIcon(icon) {
    this.mode = icon;
  }
}
