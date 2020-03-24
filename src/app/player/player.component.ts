import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


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


  constructor(private _sanitizer: DomSanitizer){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
 }
  ngOnInit(): void {
  }

}
