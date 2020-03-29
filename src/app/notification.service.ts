import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }


  info(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
