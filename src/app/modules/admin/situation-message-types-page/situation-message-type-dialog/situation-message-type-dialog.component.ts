import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SituationMessageTypeService } from '../situtation-message-type.service';
import { SituationMessageType } from 'src/app/models/situation-message-type';

@Component({
  selector: "app-situation-message-type-dialog",
  templateUrl: './situation-message-type-dialog.component.html',
  styleUrls: ['./situation-message-type-dialog.component.scss'],
})
export class SituationMessageTypeDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: [this.data?.smt?.name, [Validators.required]],
    media: [this.data?.smt?.media, [Validators.required]],
    severity: [this.data?.smt?.severity, [Validators.required]],
    color: [this.data?.smt?.color, [Validators.required]],
  });

  severities = [1, 2, 3, 4, 5];
  medias = ['media.png', 'image.jpg'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationMessageTypeDialogComponent>,
    private situationMessageTypeService: SituationMessageTypeService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; smt: SituationMessageType },
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }

  onSave() {
    const smt: SituationMessageType = this.myForm.value as SituationMessageType;
    if (this.data.mode == 'Add') {
      this.situationMessageTypeService.addSituationMessageType(smt).subscribe((val) => {
        console.log('succ. added st');
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if (this.data.mode == 'Edit') {
      smt.id = this.data.smt.id;
      this.situationMessageTypeService.updateSituationMessageType(smt).subscribe((val) => {
        console.log('succ. updated st');
        console.log(val);
        this.dialogRef.close(val);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
