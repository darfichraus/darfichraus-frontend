import { Component, OnInit } from '@angular/core';
import { Restriction } from 'src/app/models/restrictions';
import { RestrictionsReviewService } from './restrictions-review.service';

@Component({
  selector: 'app-restrictions-page',
  templateUrl: './restrictions-page.component.html',
  styleUrls: ['./restrictions-page.component.scss']
})
export class RestrictionsPageComponent implements OnInit {

  data: Restriction[];

  constructor(private restrictionsReviewService: RestrictionsReviewService) {}

  ngOnInit() {

    this.restrictionsReviewService.fetchData();

    this.restrictionsReviewService.data.subscribe((val) => {
      console.log(val);
      this.data = val;
    }, (err) => {
      console.log(err);
    });


  }

  verifData() {

    return this.data.filter((e: Restriction) => e.verified === true);
  }

  unverifData() {
    return this.data.filter((e: Restriction) => e.verified === false);

  }

}
