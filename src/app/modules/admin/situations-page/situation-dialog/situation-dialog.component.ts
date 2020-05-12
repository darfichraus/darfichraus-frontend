import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SituationService } from '../situations.service';
import { Situation } from 'src/app/models/situation';
import { SituationType } from 'src/app/models/situation-type';
import { SituationTypeService } from '../../situation-types-page/situtation-types.service';

@Component({
  selector: "app-situation-type-dialog",
  templateUrl: './situation-dialog.component.html',
  styleUrls: ['./situation-dialog.component.scss'],
})
export class SituationDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: [this.data?.st?.name, [Validators.required]],
    situationTypeId: [this.data?.st?.situationTypeId, [Validators.required]],
    startDate: [this.data?.st?.startDate, [Validators.required]],
    endDate: [this.data?.st?.endDate, [Validators.required]],
    severity: [this.data?.st?.severity, [Validators.required]],
    active: [this.data?.st?.active, [Validators.required]],
  });

  severities = [1, 2, 3, 4, 5];
  medias = ['media.png', 'image.jpg'];
  mySituationTypes: SituationType[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationDialogComponent>,
    private situationService: SituationService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; st: Situation },
    private notificationService: NotificationService,
    private situationTypeService: SituationTypeService,
  ) {}

  ngOnInit(): void {

    this.situationTypeService.getAllSituationTypes().subscribe((val) => {
      this.mySituationTypes = val;
    }, (err) => {
      console.log(err);
    });

  }

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }

  onSave() {
    const st: Situation = this.myForm.value as Situation;
    if (this.data.mode == 'Add') {
      this.situationService.addSituation(st).subscribe((val) => {
        console.log('succ. added st');
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if (this.data.mode == 'Edit') {
      st.id = this.data.st.id;
      this.situationService.updateSituation(st).subscribe((val) => {
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
