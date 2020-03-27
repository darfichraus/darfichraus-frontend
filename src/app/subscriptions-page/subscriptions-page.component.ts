import { Component, OnInit } from '@angular/core';
import { Subscription } from './Subscription';
import { RestrictionType, RestrictionTypeTranslator } from '../Restriction';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {


  primeData: Subscription[] = [];
  selectedRestr = [];


  constructor(public subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

    this.subscriptionService.fetchData().subscribe(data => {

      this.primeData = data;
      console.log(data);

    }, (err) => {
      console.log(err);
    });
  }


  translateRestrictionToIcon(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translateToIcon(restrictionType);
  }

  translateRestrictionType(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translate(restrictionType);
  }






  cols: any[] = [ 
    { field: 'id', header: 'id'},
    { field: 'email', header: 'email'},
    { field: 'areal', header: 'areal'},
    { field: 'arealIdentifier', header: 'arealIdentifier'},
    { field: 'types', header: 'types'},
    { field: 'created', header: 'created'},
  ];

openDialog(data) {

}
  

}