import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './user-management.service';
import { User } from 'src/app/models/user';
import { ModalService } from '../../modal-template-module/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { NotificationService } from 'src/app/modules/core/services/notification.service';

@Component({
  selector: "app-users-page",
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selected: User[] = [];
  _search = '';

  constructor(
    private userManagementService: UserManagementService,
    private modalService: ModalService, private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.userManagementService.getAllUsers().subscribe(
      (val) => {
        console.log(val);
        this.users = val;
        this.filteredUsers = val;
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
      this.filteredUsers = this.users.filter(user => {
        return user.username.toLowerCase().indexOf(lowercase) >= 0; // || user.lastname.toLowerCase().indexOf(lowercase) >= 0
      });
    } else {
      this.filteredUsers = this.users;
    }
  }


  openModal(mode: string, user: User) {

    const dialogRef = this.dialog.open(AddUserModalComponent, {
      autoFocus: false,
      data: {mode, user},
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        if (mode === 'Add') {
          this.users = [...this.users, result];
          this.filteredUsers = [...this.filteredUsers, result];
        } else if (mode === 'Edit') {
          /*
          const index: number = this.users.findIndex((e) => e.id === user.id);
          const usersNew: User[] = [...this.users];
          const updUser: User = {...user};
          updUser.firstName = result.firstName;
          updUser.lastName = result.lastName;
          updUser.roles = result.roles;
          updUser.phoneNumber = result.phoneNumber;
          usersNew[index] = updUser;
          this.users = usersNew;
          */
        }
    }

    });


  }

  onDeleteSelection() {
    const toBeRemoved = this.selected.length;

    const dialogRef: any = this.modalService.confirmModal(
      'Do you want to delete ' + toBeRemoved + ' users?'
    );


    dialogRef.afterClosed().subscribe((val) => {
      console.log(val);
      if (val === true) {
        let count = 0;
        this.selected.forEach((user) => {
          this.users = this.users.filter(e => e.username !== user.username);
          this.filteredUsers = this.filteredUsers.filter(e => e.username !== user.username);
          this.userManagementService.deleteUser(user.username).subscribe((val) => {
            count += 1;
            if (count === toBeRemoved) {
              this.notificationService.info('Deleted ' + toBeRemoved + ' users.');
            }
          });
        });
      }
    });
  }

}
