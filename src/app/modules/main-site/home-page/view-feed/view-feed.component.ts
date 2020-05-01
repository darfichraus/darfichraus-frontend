import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restriction } from 'src/app/models/restriction';
import { RestrictionStateTranslator } from 'src/app/models/restriction-state-translator';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';
import { FeedService } from '../feed/feed.service';
import { ActivatedRoute } from '@angular/router';
import { RestrictionType } from 'src/app/models/restriction-type';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.scss']
})
export class ViewFeedComponent implements OnInit {

  restr: Restriction;

  constructor(private dialogRef: MatDialogRef<ViewFeedComponent>, 
    @Inject(MAT_DIALOG_DATA) public restriction: Restriction, 
    private feedService: FeedService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      this.feedService.getFeedById(params.get('id')).subscribe((val) => {
        console.log(val);
        //this.restr = val;
      },
      (err) => {
        console.log(err);
      }
    );
    });*/

    this.feedService.getFeedById(this.restriction.id).subscribe((val: Restriction) => {
      console.log(val);
      this.restr = val;
    },
    (err) => {
      console.log(err);
    }
  );

  }


  stateTranslate() {
    return RestrictionStateTranslator.translate(this.restr?.restrictionState);
  }

  typeTranslate() {
    return RestrictionTypeTranslator.translate(this.restr?.restrictionType);
  }

  iconTranslate() {
    return RestrictionTypeTranslator.translateToIcon(this.restr.restrictionType);
  }


  onCancel(): void {
    this.dialogRef.close();
  }


}
