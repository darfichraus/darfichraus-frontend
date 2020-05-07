import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth.service';

import { faUserCircle, faBookmark, faListAlt, faComment } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  faUserCircle = faUserCircle;
  faBookmark = faBookmark;
  faListAlt = faListAlt;
  faComment = faComment;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
