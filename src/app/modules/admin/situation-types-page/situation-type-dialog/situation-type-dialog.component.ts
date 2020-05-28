import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/modules/core/services/notification.service";
import { SituationType } from "src/app/models/situation-type";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SituationTypeService } from '../situtation-types.service';
import { Webresource } from 'src/app/models/webresource';
import { WebresourceService } from '../../assets-page/assets.service';

@Component({
  selector: "app-situation-type-dialog",
  templateUrl: "./situation-type-dialog.component.html",
  styleUrls: ["./situation-type-dialog.component.scss"],
})
export class SituationTypeDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: [this.data?.st?.name, [Validators.required]],
    description: [this.data?.st?.description, [Validators.required]],
    severity: [this.data?.st?.severity, [Validators.required]],
    media: [this.data?.st?.media, [Validators.required]],
  });

  severities = [1,2,3,4,5];

  medias = ["media.png", "image.jpg"];

  myMedias: Webresource[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationTypeDialogComponent>,
    private situationTypeService: SituationTypeService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; st: SituationType },
    private notificationService: NotificationService,
    private webresourceService: WebresourceService,
  ) {}

  ngOnInit(): void {

    this.webresourceService.getWebresource().subscribe(
      (val) => {
        console.log(val);
        this.myMedias = val;
      },
      (err) => {
        console.log(err);
      }
    );
  }

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }
    
  onSave() {
    let st: SituationType = this.myForm.value as SituationType;
    console.log(st);
    if(this.data.mode == 'Add') {
      this.situationTypeService.addSituationType(st).subscribe((val) => {
        console.log("succ. added st");
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if(this.data.mode == 'Edit') {
      st.id = this.data.st.id;
      this.situationTypeService.updateSituationType(st).subscribe((val) => {
        console.log("succ. updated st");
        console.log(val);
        this.dialogRef.close(val);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
