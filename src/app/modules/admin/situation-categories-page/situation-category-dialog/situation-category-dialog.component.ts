import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { SituationType } from 'src/app/models/situation-type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SituationCategory } from 'src/app/models/situation-category';
import { SituationCategoryService } from '../situtation-category.service';

@Component({
  selector: "app-situation-category-dialog",
  templateUrl: './situation-category-dialog.component.html',
  styleUrls: ['./situation-category-dialog.component.scss'],
})
export class SituationCategoryDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: [this.data?.st?.name, [Validators.required]],
    info: [this.data?.st?.info, [Validators.required]],
    icon: [this.data?.st?.icon, [Validators.required]],
    color: [this.data?.st?.color, [Validators.required]],
    active: [this.data?.st?.active, [Validators.required]],
  });

  severities = [1, 2, 3, 4, 5];
  icons = ['media.png', 'image.jpg'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationCategoryDialogComponent>,
    private situationCategoryService: SituationCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; st: SituationCategory },
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }

  onSave() {
    const st: SituationCategory = this.myForm.value as SituationCategory;
    if (this.data.mode == 'Add') {
      this.situationCategoryService.addSituationCategory(st).subscribe((val) => {
        console.log('succ. added st');
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if (this.data.mode == 'Edit') {
      st.id = this.data.st.id;
      this.situationCategoryService.updateSituationCategory(st).subscribe((val) => {
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
