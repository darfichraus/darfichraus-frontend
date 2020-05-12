import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SituationReference } from 'src/app/models/situation-reference';
import { SituationReferenceService } from '../situtation-reference.service';

@Component({
  selector: "app-situation-reference-dialog",
  templateUrl: './situation-reference-dialog.component.html',
  styleUrls: ['./situation-reference-dialog.component.scss'],
})
export class SituationReferenceDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    title: [this.data?.sr?.title, [Validators.required]],
    type: [this.data?.sr?.type, [Validators.required]],
    classifier: [this.data?.sr?.classifier, [Validators.required]],
    source: [this.data?.sr?.source, [Validators.required]],
  });

  types: string[] = SituationReference.getSituationReferenceTypes();
  classifiers = SituationReference.getSituationReferenceClassifiers();
  classifierToIcon = SituationReference.classifierToIcon;
  typeToIcon = SituationReference.typeToIcon;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationReferenceDialogComponent>,
    private situationReferenceService: SituationReferenceService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; sr: SituationReference },
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }

  onSave() {
    const st: SituationReference = this.myForm.value as SituationReference;
    if (this.data.mode == 'Add') {
      this.situationReferenceService.addSituationReference(st).subscribe((val) => {
        console.log('succ. added st');
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if (this.data.mode == 'Edit') {
      st.id = this.data.sr.id;
      this.situationReferenceService.updateSituationReference(st).subscribe((val) => {
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
