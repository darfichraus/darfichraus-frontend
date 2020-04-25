import { Component, OnInit } from '@angular/core';
import { Subscription } from './Subscription';
import { SubscriptionService } from './subscription.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../modal-template-module/modal.service';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';

@Component({
  selector: "app-subscriptions-page",
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss'],
})
export class SubscriptionsPageComponent implements OnInit {
  subs: Subscription[] = [];
  filteredSubs: Subscription[] = [];
  selected = [];
  _search = '';
  restrictionToIcon = RestrictionTypeTranslator.translateToIcon;
  restrictionToType = RestrictionTypeTranslator.translate;

  constructor(
    public subscriptionService: SubscriptionService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private notificationService: NotificationService
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
      this.filteredSubs = this.subs.filter((sub) => {
        return (
          sub.id.toLowerCase().indexOf(lowercase) >= 0 ||
          sub.email.toLowerCase().indexOf(lowercase) >= 0
        );
      });
    } else {
      this.filteredSubs = this.subs;
    }
  }

  viewSub(sub) {}

  onDeleteSelection() {
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

    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      'Do you want to delete ' + toBeRemoved + ' subscriptions?'
    );

    dialogRef.afterClosed().subscribe((val) => {

      if (val === true) {
        let count = 0;
        this.selected.forEach((sub) => {
          this.subs = this.subs.filter((e) => e.id !== sub.id);
          this.filteredSubs = this.filteredSubs.filter((e) => e.id !== sub.id);
          this.subscriptionService.deleteSubscription(sub).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info(
                'Deleted ' + toBeRemoved + ' users.'
              );
            }
          });
        });
      }
    });
  }


  openDialog(data) {}


}
