import {AfterContentInit, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImpressumComponent } from './impressum/impressum.component';
import { PlayerComponent } from './player/player.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor(private dialog: MatDialog) {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImpressumComponent, {
      width: '900px',
      height: '700px',
      restoreFocus: false,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openVideo(): void {
    const dialogRef = this.dialog.open(PlayerComponent, {
      width: '600px',
      restoreFocus: false,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
