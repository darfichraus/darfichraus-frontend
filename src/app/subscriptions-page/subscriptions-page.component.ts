import { Component, OnInit } from '@angular/core';
import { Subscription } from './Subscription';
import { RestrictionType, RestrictionTypeTranslator } from '../Restriction';
import { SubscriptionService } from './subscription.service';
import {MenuItem} from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';


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


  constructor(public subscriptionService: SubscriptionService, private dialog: MatDialog) { }

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

    /*
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        this.subscriptionService.deleteSubscription(sub).subscribe((val)=> {
          const index = this.primeData.indexOf(this.selectedSub);
          this.primeData = this.primeData.filter((val, i) => i !== index);
        }, (err)=> {
          console.log(err);
        });
      }
    });
    */
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