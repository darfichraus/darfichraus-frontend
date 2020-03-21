import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { Observable } from 'rxjs';
import { Restriction } from '../Restriction';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  data: Observable<Restriction[]>;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {

    this.data = this.feedService.fetchData();
    
    /*let data2 = this.feedService.fetchData().subscribe((val) => {
      this.data = val;
      console.log(val);
    }, (err) => {
      console.log(err);
    });
    */
    
  }

}
