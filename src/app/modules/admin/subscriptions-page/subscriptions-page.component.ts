import { Component, OnInit } from "@angular/core";
import { Subscription } from "./Subscription";
import { SubscriptionService } from "./subscription.service";
import { MenuItem } from "primeng/api";
import { MatDialog } from "@angular/material/dialog";
import { RestrictionType } from 'src/app/models/restriction-type';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';

@Component({
  selector: "app-subscriptions-page",
  templateUrl: "./subscriptions-page.component.html",
  styleUrls: ["./subscriptions-page.component.scss"],
})
export class SubscriptionsPageComponent implements OnInit {
  subs: Subscription[] = [];
  filteredSubs: Subscription[] = [];
  selected = [];
  _search = '';

  constructor(
    public subscriptionService: SubscriptionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(
      (data) => {
        this.subs = data;
        this.filteredSubs = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get searchQuery() {
    return this._search;
  }

  set searchQuery(value: string) {
    this._search = value;
    if (value) {
      const lowercase = value.toLowerCase().trim();
      this.filteredSubs = this.subs.filter(sub => {
        return sub.id.toLowerCase().indexOf(lowercase) >= 0 || sub.email.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredSubs = this.subs;
    }
  }

  viewSub(sub) {}

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

  openDialog(data) {}
}
