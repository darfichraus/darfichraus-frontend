import { Component, OnInit } from '@angular/core';
import { MeldungComponent } from './meldung/meldung.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedService } from './feed.service';
import { FetchResult } from './Restriction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dir-frontend';
  mode: string;
  data: FetchResult;


  constructor(private dialog: MatDialog, public feedService: FeedService) {

  }

  ngOnInit() {

    this.feedService.data.subscribe(data => {
      this.data = data;

      console.log(this.data.data);
    });  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MeldungComponent, {
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

  onIcon(icon) {
    this.mode = icon;
  }


}
