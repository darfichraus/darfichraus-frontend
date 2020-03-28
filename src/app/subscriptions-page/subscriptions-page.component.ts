import { Component, OnInit } from '@angular/core';
import { Subscription } from './Subscription';
import { RestrictionType, RestrictionTypeTranslator } from '../Restriction';
import { SubscriptionService } from './subscription.service';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-subscriptions-page',
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {


  primeData: Subscription[] = [];
  selectedRestr = [];
  items: MenuItem[];
  selectedSub;

  cols: any[] = [ 
    { field: 'id', header: 'id'},
    { field: 'email', header: 'email'},
    { field: 'areal', header: 'areal'},
    { field: 'arealIdentifier', header: 'arealIdentifier'},
    { field: 'types', header: 'types'},
    { field: 'created', header: 'created'},
  ];


  constructor(public subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

    this.subscriptionService.fetchData().subscribe(data => {

      this.primeData = data;
      this.items = [
        { label: 'Edit', icon: 'pi pi-user-edit', command: (event) => this.viewSub(this.selectedSub) },
        { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteSub(this.selectedSub) }
    ];
      console.log(data);

    }, (err) => {
      console.log(err);
    });
  }

  viewSub(sub) {

  }

  deleteSub(sub) {

  }


  translateRestrictionToIcon(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translateToIcon(restrictionType);
  }

  translateRestrictionType(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translate(restrictionType);
  }






  

openDialog(data) {

}
  

}