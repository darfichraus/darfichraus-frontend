import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  safeURL;
  src='https://www.youtube.com/embed/7bJ5fIwd9wg';
  isLoading: boolean = true;
  loads: boolean = true;


  constructor(private _sanitizer: DomSanitizer, public dialogRef: MatDialogRef<PlayerComponent>,
    ){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
 }
  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
